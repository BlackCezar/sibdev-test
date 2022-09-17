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

export interface AuthStatisticsResponse {
  kind: string,
  etag: string,
  nextPageToken: string,
  prevPageToken: string,
  regionCode: string,
  pageInfo: {
      totalResults: number,
      resultsPerPage: number
  },
  items: Array<StatisticsItem>
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
    stats?: {
      viewCount: number,
      likeCount: number,
      dislikeCount: number,
      favoriteCount: number,
      commentCount: number
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

export type AdvancedSearchResult = {
  list: Array<SearchResource>,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number
  } | null,
  query: string,
  statistics: Array<StatisticsItem>
}

export type StatisticsItem = {
  kind: string,
  etag: string,
  id: string,
  statistics: {
    viewCount: number,
    likeCount: number,
    dislikeCount: number,
    favoriteCount: number,
    commentCount: number
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

