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
  return videos.sort((a, b) => relevancy(b, keywords) - relevancy(a, keywords));
}
