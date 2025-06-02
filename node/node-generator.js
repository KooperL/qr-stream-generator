const QRCode = require('qrcode')
const fs = require('fs');
const path = require('path');
// Utility functions
const QRUtils = {
    calculateChecksum(data) {
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
            sum += data.charCodeAt(i);
        }
        return sum.toString(16).padStart(8, '0');
    },

    getChunkSize(correctionLevel) {
        switch(correctionLevel) {
            case 'L': return 300;
            case 'M': return 250;
            case 'Q': return 200;
            case 'H': return 150;
            default: return 150;
        }
    },

    async createFrames(file, correctionLevel) {
        const CHUNK_SIZE = this.getChunkSize(correctionLevel);
        const frames = [];
        const totalBytes = file.size;
        
        const buffer = await file.arrayBuffer;
        const data = new Uint8Array(buffer);
        
        const totalFrames = Math.ceil(data.length / CHUNK_SIZE);
        
        const headerFrame = {
            version: 1,
            totalFrames: totalFrames,
            totalBytes: totalBytes,
            filename: file.name,
            checksum: 123 //this.calculateChecksum(String.fromCharCode.apply(null, data))
        };
        frames.push(headerFrame);
        
        for (let i = 0; i < totalFrames; i++) {
            const start = i * CHUNK_SIZE;
            const end = Math.min(start + CHUNK_SIZE, data.length);
            const chunk = data.slice(start, end);
            
            const base64Data = btoa(String.fromCharCode.apply(null, chunk));
            
            const frame = {
                frameNumber: i + 1,
                data: base64Data,
                length: chunk.length
            };
            frames.push(frame);
        }
        
        return frames;
    },

    async generateQRCodeFromFrames(frame, correctionLevel) {
        return new Promise((resolve) => {
            const opts = {
                errorCorrectionLevel: correctionLevel,
                type: 'terminal',
                quality: 0.3,
                margin: 1,
                color: {
                  dark:"#010599FF",
                  light:"#FFBF60FF"
                }
            }
            QRCode.toString(JSON.stringify(frame), opts, function (err, url) {
                if (err) {
                    return resolve(null)
                }
                resolve(url)
              })
        });
    }
}

const fileInput = process.argv[2]
const correctionLevel = process.argv[3] ?? 'H'

async function main() {
    const filePath = path.resolve(__dirname, fileInput)
    const file = {
        arrayBuffer: fs.readFileSync(filePath),
        name: fileInput,
        size: fs.statSync(filePath).size
    }
    const frames = await QRUtils.createFrames(file, correctionLevel)
    for (let i = 0; i < frames.length; i++) {
        const qrCode = await QRUtils.generateQRCodeFromFrames(frames[i], correctionLevel)
        console.log(qrCode)
    }
}

main()