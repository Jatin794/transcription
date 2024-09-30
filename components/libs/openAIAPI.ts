import axios from 'axios';
import OpenAI from 'openai';

/**
 * Transcribe some audio using the OpenAI Whisper API:
 * https://platform.openai.com/docs/guides/speech-to-text/quickstart
 */
export async function transcribeAudio(
  blob: Blob,
  apiToken: string
): Promise<OpenAI.Audio.Transcriptions.Transcription> {
  const formData = new FormData();
  formData.set('file', blob, 'audio.webm');
  formData.set('model', 'whisper-1');

  const result = await axios({
    url: 'https://api.zukijourney.com/v1/audio/transcriptions',
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    method: 'POST',
    data: formData,
  });

  return result.data;
}
