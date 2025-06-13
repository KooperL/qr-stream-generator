# QR Scanner & Generator Suite

**Encode and decode files using QR code video streams — all in your browser.**

---

## Project Overview

**QR Scanner & Generator Suite** is an open-source web project that demonstrates how to encode any file into a sequence of QR codes, generate a video from those codes, and later reconstruct the original file by scanning the QR codes from the video. This project showcases advanced browser-based file processing, QR encoding/decoding, and video manipulation — all **without any server-side processing**.

---

## Key Features

- **File to QR Video Generator:**  
  Upload any file and convert it into a video of QR codes, with adjustable error correction and frame rate.

- **QR Video Scanner:**  
  Upload a QR code video to reconstruct and download the original file, using robust frame-by-frame QR decoding.

- **Privacy-first & Undetectable:**  
  <span style="color:#1976d2;font-weight:bold;">All processing happens locally in your browser.</span>  
  No files are uploaded or sent anywhere. This makes the process virtually undetectable by network monitoring tools.

- **Performance:**  
  Typical speed is **2 seconds per 500 bytes** of file data  
  (e.g., a 1KB file takes about 4 seconds to encode or decode).

- **Open & Extensible:**  
  Built with modern JavaScript, open libraries, and modular code for easy customization.

---

## Important Notice

> **This tool is for educational and experimental use only.**  
> **Do not use it to breach company data policies or transmit confidential information without proper authorization.**

---

## Host Locally

You can run this project entirely offline, directly in your browser:

1. **Clone or download** this repository.  
2. **Open the folder** on your computer.  
3. **Open `index.html` in your browser** (no server needed).

---

## Links

- [➡️ QR Video Generator](online-generator.html)  
  Encode a file into a QR code video

- [⬅️ QR Video Scanner](online-scanner.html)  
  Decode a QR code video back to a file

- [💻 GitHub Repo](https://github.com/KooperL/qr-stream-generator)  
  View source & contribute

---

*Created for educational and experimental purposes. For large files, processing may take time and browser memory.*

---

## Scanner structure (v1)
### Header frame
`json
version: number,
frameNumber: 0,
totalFrames: number,
totalBytes: number,
filename: string,
checksum: string
`

### Contents frame
`json
frameNumber: number,
data: string (b64 padded),
length: number
`