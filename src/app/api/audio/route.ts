import fs from 'fs'
import path from 'path'

export async function POST(req: Request, res: Response) {
  let data = await req.arrayBuffer();
  // console.log(data);
  const dirRelativeToPublicFolder = 'audio-testing'

  const dir = path.resolve('./public', dirRelativeToPublicFolder);

  const audioFiles = fs.readdirSync(dir);
  const randomIndex = Math.floor(Math.random() * audioFiles.length);
  const randomAudioFile = audioFiles[randomIndex]
  const mediaFile = fs.readFileSync(path.resolve('./public', dirRelativeToPublicFolder, randomAudioFile))

  return new Response(mediaFile, {
    headers: {
      'Content-Type': 'audio/mpeg',
    },
    status: 200
  })
}