import Grid from '@/components/ui/Grid';
import { ClubCard } from '@/components/clubs/ClubCard';

export default function pages() {
  return (
    <div className="my-10">
      <Grid columns={3} placeItems="center" spacing="lg">
        {Array.from({ length: 30 }).map(() => (
          <ClubCard key="s" />
        ))}
      </Grid>
    </div>
  );
}
