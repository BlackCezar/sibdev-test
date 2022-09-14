export interface AuthResponse {
    kind: string,
    etag: string,
    nextPageToken: string,
    prevPageToken: string,
    regionCode: string,
    pageInfo: {
        totalResults: number,
        resultsPerPage: number
    },
    items: Array<SearchResource>
}

export type SearchResource = {
    kind: string,
    etag: string,
    id: {
      kind: string,
      videoId: string,
      channelId: string,
      playlistId: string
    },
    snippet: {
      publishedAt: Date,
      channelId: string,
      title: string,
      description: string,
      thumbnails: {
        default: {
          url: string,
          width: number,
          height: number
        },
        high: {
            url: string,
            width: number,
            height: number
          },
          medium: {
            url: string,
            width: number,
            height: number
          }
      },
      channelTitle: string,
      liveBroadcastContent: string
    }
}

export type SearchState = {
    query: string,
    isLoading: Boolean,
    pageInfo: {
        totalResults: number,
        resultsPerPage: number
    } | null,
    list: object | null | Array<SearchResource>,
    error: string
}

