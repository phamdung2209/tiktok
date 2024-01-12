function ConvertData({ data }) {
    return data >= 1000 ? `${(data / 1000).toFixed(1)}K` : data >= 1000000 ? `${(data / 1000000).toFixed(1)}M` : data >= 1000000000 ? `${(data / 1000000000).toFixed(1)}B` : data
}

export const FormattedDate = ({ data }) => {
    if (!data) {
        return null
    }

    const publishedAtDate = new Date(data)

    const day = publishedAtDate.getDate()
    const month = publishedAtDate.getMonth() + 1
    const year = publishedAtDate.getFullYear()

    const currentYear = new Date().getFullYear()

    if (currentYear === year) {
        return `${month}-${day}`
    }

    return `${year}-${month}-${day}`
}

export const FormattedTime = ({ seconds }) => {
    if (!seconds) {
        return '0:00'
    }

    const hours = Math.round(seconds / 3600)
    const minutes = Math.round(seconds % 3600 / 60)
    const secondsLeft = Math.round(seconds % 60)

    return `${hours ? hours + ':' : ''}${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`
}

export default ConvertData