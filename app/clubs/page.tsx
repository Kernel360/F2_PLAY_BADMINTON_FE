import Grid from '@/components/ui/Grid';
import ClubCard from '@/components/clubs/ClubCard';
import { Input } from '@/components/ui/Input';

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
