# qr-scanner-generator

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