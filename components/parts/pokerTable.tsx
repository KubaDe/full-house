import { groupBy, orderBy } from "lodash-es";

import { PokerSeat, type PokerSeatProps, SeatState } from "@/components/parts/pokerSeat";
import { PersonBadge } from "@/components/parts/personBadge";
import { Card } from "@/components/uiKit/card";

type PokerTableProps = {
  seats: (PokerSeatProps & { id: string })[];
};

export const PokerTable = ({ seats }: PokerTableProps) => {
  const sortedSeats = orderBy(seats, "activeValue");
  const groupedSeats = groupBy(sortedSeats, "state");
  const groupedRevealedSeats = groupBy(groupedSeats[SeatState.Revealed], "activeValue");
  return (
    <div className="flex flex-col gap-8">
      <Card className="flex flex-col gap-8 px-10 py-4">
        <div className="flex">
          {groupedSeats[SeatState.Covered].map(({ id, ...seat }) => (
            <div key={id} className="z-10 w-6 hover:z-20">
              <PokerSeat {...seat} showBackground={false} />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {Object.entries(groupedRevealedSeats).map(([activeValue, seats]) => {
            const profiles = seats.map(({ profile }) => profile);
            return (
              <div key={activeValue} className="flex gap-12">
                <div className="flex">
                  {seats.map(({ id, ...seat }) => (
                    <div key={id} className="z-10 w-4 hover:z-20">
                      <PokerSeat {...seat} showBadge={false} showBackground={false} />
                    </div>
                  ))}
                </div>
                <div className="flex h-auto items-center gap-4">
                  {profiles.map((profile) => (
                    <PersonBadge key={profile.id} profile={profile} className="z-20" />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      <div className="grid grid-cols-3 gap-10">
        {groupedSeats[SeatState.Empty].map(({ id, ...seat }) => (
          <PokerSeat key={id} {...seat} />
        ))}
      </div>
    </div>
  );
};
