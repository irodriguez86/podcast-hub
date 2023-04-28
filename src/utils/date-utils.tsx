export function formatDate(dateStr: string): string {
    const date = new Date(dateStr)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }
  
  export function formatDuration(durationMillis: number): string {
    const hours = Math.floor(durationMillis / 3600000)
    const minutes = Math.floor((durationMillis % 3600000) / 60000)
    const seconds = Number(((durationMillis % 60000) / 1000).toFixed(0))
    return `${hours ? hours + ':' : ''}${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`
  }