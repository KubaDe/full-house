import Color from "colorjs.io";
import { AnimatePresence, motion } from "framer-motion";
import { PointCard, type PointCardProps } from "@/components/parts/pointCard";
import { Deck } from "@/components/parts/deck";
import { Card } from "@/components/uiKit/card";
import { PersonBadge, type Profile } from "@/components/parts/personBadge";

const c1 = new Color("#039c38");
const c2 = new Color("#a8162e");
const colorRange = c1.range(c2, { space: "lch" });

const getDominantColor = (index: number) => {
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  return colorRange(index).toString({ format: "hex" });
};

export const preset: PointCardProps[] = [
  {
    value: "0.5",
    label: "1/2",
    dominantColor: getDominantColor(0),
  },
  {
    value: "1",
    label: 1,
    dominantColor: getDominantColor(0.1),
  },
  {
    value: "2",
    label: 2,
    dominantColor: getDominantColor(0.15),
  },
  {
    value: "3",
    label: 3,
    dominantColor: getDominantColor(0.2),
  },
  {
    value: "5",
    label: 5,
    dominantColor: getDominantColor(0.3),
  },
  {
    value: "8",
    label: 8,
    dominantColor: getDominantColor(0.4),
  },
  {
    value: "13",
    label: 13,
    dominantColor: getDominantColor(0.55),
  },
  {
    value: "21",
    label: 21,
    dominantColor: getDominantColor(0.8),
  },
  {
    value: "34",
    label: 34,
    dominantColor: getDominantColor(0.9),
  },
  {
    value: "infinity",
    label: "♾️",
    special: true,
    dominantColor: getDominantColor(1),
  },
  {
    value: "coffee",
    label: "☕️",
    special: true,
    dominantColor: "#000000",
  },
  {
    value: "question",
    label: "🤔",
    special: true,
    dominantColor: "#000000",
  },
];

type PokerDeckProps = {
  activeValue?: string;
  setActiveValue?: (value: string) => void;
  profile: Profile;
};

export const PokerDeck = ({ activeValue, setActiveValue, profile }: PokerDeckProps) => {
  const selectedPreset = preset.find((p) => p.value === activeValue);
  const selectedIndex = preset.findIndex((p) => p.value === activeValue);
  return (
    <div className="flex items-end gap-6">
      <Card className="border-0 bg-gray-50 p-6">
        <Deck className="relative grid-cols-3" selectedIndex={selectedIndex}>
          {preset.map((props) => (
            <motion.div
              key={props.value}
              layoutId={props.value}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PointCard
                onClick={() => props.value && setActiveValue?.(props.value)}
                {...props}
                isActive={activeValue === props.value}
              />
            </motion.div>
          ))}
        </Deck>
      </Card>
      <Card className="relative flex size-40 items-center justify-center border-0 bg-gray-50 p-6">
        <div className="absolute -top-0 -translate-y-14">
          <PersonBadge profile={profile} className="w-40" />
        </div>
        <AnimatePresence>
          {selectedPreset && (
            <motion.div key={selectedPreset.value} layoutId={selectedPreset.value}>
              <PointCard
                onClick={() => selectedPreset.value && setActiveValue?.(selectedPreset.value)}
                {...selectedPreset}
                isActive={true}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
};
