export const API_ENDPOINT = "https://clone-management-svc.safeapp.workers.dev"

export interface ApiAudioStreaming {
  name: string
  ready_url: string
  spawned: boolean
  status_url: string
  url: string
}

export interface spawnedBackendStatus {
  state: "Ready" | "Swept" | string
  backend: string
  time: string
}

export async function startAudioStreaming(){
	const responce = await fetch(`${API_ENDPOINT}/backend/audio`, {
		method: "GET"
	})

	const data = await responce.json()
	return data as ApiAudioStreaming
}