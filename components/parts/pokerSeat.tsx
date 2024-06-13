import { type AnimationProps, motion } from "framer-motion";
import { PointCard } from "@/components/parts/pointCard";
import { PersonBadge, type Profile } from "@/components/parts/personBadge";
import { preset } from "@/components/parts/pokerDeck";
import { Card } from "@/components/uiKit/card";
import { cn } from "@/lib/utils";

export enum SeatState {
  Empty = "Empty",
  Covered = "Covered",
  Revealed = "Revealed",
}

export type PokerSeatProps = {
  profile: Profile;
  state: SeatState;
  activeValue?: string | null;
  showBadge?: boolean;
  showBackground?: boolean;
};

const animations = {
  [SeatState.Empty]: { right: "-34px", top: "-50px", rotate: 12, scale: 0.3 },
  [SeatState.Covered]: { rotate: 0, scale: 0.6 },
  [SeatState.Revealed]: {
    rotate: 0,
    scale: 0.7,
    filter: ["blur(10px)", "blur(0)"],
  },
} satisfies Record<SeatState, AnimationProps["animate"]>;

export const PokerSeat = ({
  profile,
  state,
  activeValue,
  showBadge = true,
  showBackground = true,
}: PokerSeatProps) => {
  const presetItem = preset.find((presetItem) => presetItem.value === activeValue) ?? {};
  const cardElevatorProps = {
    layoutId: `card-elevator-${profile.id}`,
    className: "flex w-auto justify-center absolute z-10",

    animate: animations[state],
    children: (
      <PointCard
        dominantColor="#cb950e"
        animate={false}
        isDisabled
        isFlipped={state !== SeatState.Revealed}
        {...presetItem}
      />
    ),
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Card
        className={cn(
          "relative flex  aspect-[2.5/3.5] w-16 items-center justify-center rounded-2xl  transition-colors duration-300",
          showBackground ? "border-dashed bg-white" : "border-none bg-transparent",
        )}
      >
        {state !== SeatState.Empty ? (
          <motion.div {...cardElevatorProps} />
        ) : (
          <p className="text-6xl font-extralight opacity-10">?</p>
        )}
      </Card>

      <div className="relative">
        {state === SeatState.Empty && (
          <motion.div {...cardElevatorProps} initial={animations[SeatState.Empty]} />
        )}
        {showBadge && <PersonBadge profile={profile} isOpen={state === SeatState.Empty} />}
      </div>
    </div>
  );
};
