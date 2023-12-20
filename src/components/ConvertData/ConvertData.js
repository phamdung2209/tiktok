function ConvertData({ data }) {
    return data >= 1000 ? `${(data / 1000).toFixed(1)}K` : data >= 1000000 ? `${(data / 1000000).toFixed(1)}M` : data >= 1000000000 ? `${(data / 1000000000).toFixed(1)}B` : data
}

export default ConvertData;