import Video from "../models/Video";

function countMatches(text: string, keywords: string[]): number {
  return keywords.filter((key) => text.includes(key)).length;
}

export function relevancy(video: Video, keywords: string[]): number {
  const [title, description, ...tags] = [
    video.snippet.title,
    video.snippet.description,
    ...(video.snippet.tags ?? []),
  ].map((item) => item.toLowerCase());

  return [
    10 * countMatches(title, keywords),
    ...tags.map((t) => 5 * countMatches(t, keywords)),
    countMatches(description, keywords),
  ].reduce((a, b) => a + b, 0);
}

export function getKeywords(query: string): string[] {
  return query.toLowerCase().trim().split(/\s+/);
}

export function sortVideos(videos: Video[], keywords: string[]): Video[] {
  return videos.sort((a: Video, b: Video) => {
    const d = relevancy(b, keywords) - relevancy(a, keywords);
    if (d !== 0) return d;
    return parseInt(b.statistics.likeCount) / parseInt(b.statistics.viewCount) - parseInt(a.statistics.likeCount) / parseInt(a.statistics.viewCount)
  });
}

function watchedVideos(videos: Video[]): Video[] {
  const history = window.localStorage.getItem("history") ?? "";
  const vmap: { [key: string]: Video } = {};
  for (const video of videos) {
    vmap[video.id] = video;
  }
  return history
    .split(",")
    .filter((vid) => vid in vmap)
    .map((vid) => vmap[vid]);
}

function getTags(videos: Video[]): string[] {
  return videos
    .map((v) => v.snippet.tags ?? [])
    .flat()
    .map((v) => Array.from(new Set(getKeywords(v))))
    .flat();
}

export function watchedTags(videos: Video[]): string[] {
  return getTags(watchedVideos(videos));
}

export function similarVideos(videos: Video[], target: Video): Video[] {
  const keywords = getTags([target]);
  return sortVideos(videos, keywords);
}
