import useLocalStore from 'use-local-storage-state'

const KEY = 'AUTH_USER'

export default function useAuthUser () {
  return useLocalStore(KEY)
}