export interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0, 1, 2, 3, 4
}

interface ContributionsApiResponse {
  total: { [year: string]: number };
  contributions: ContributionDay[];
}

export async function getGithubContributions(username = "amsubhm"): Promise<ContributionDay[]> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      next: { revalidate: 3600 }, // Cache on Edge CDN and revalidate hourly
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch GitHub contributions: ${res.statusText}`);
    }
    const data: ContributionsApiResponse = await res.json();
    if (data.contributions && data.contributions.length > 0) {
      return data.contributions;
    }
  } catch (error) {
    console.error("Error fetching real GitHub contributions:", error);
  }
  return [];
}
