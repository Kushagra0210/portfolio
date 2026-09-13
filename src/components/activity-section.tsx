import { ActivityGrid } from "@/components/activity-grid";
import { getActivity } from "@/lib/activity";

export async function ActivitySection() {
  const summaries = await getActivity();
  return <div className="activity-grid-wrap">{summaries.map((summary) => <ActivityGrid key={summary.platform} summary={summary} />)}</div>;
}
