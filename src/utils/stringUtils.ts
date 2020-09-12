type ImageInfo = {
  buffer: Buffer
  type: string
}

export const getImageFromBlob = (blob: string): ImageInfo => {
  const imageBuffer = Buffer.from(blob.replace(/^data:image\/\w+;base64,/, ''), 'base64')
  const type = blob.split(';')[0].split('/')[1]
  return {
    buffer: imageBuffer,
    type: type,
  }
}