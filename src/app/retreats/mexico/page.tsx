// Becoming HER after the retreat (Oct 27–31, 2026). The full sales page —
// rooms, FAQs, day-by-day — is kept in ./_archive for the next Mexico
// retreat. Layout and form live in the shared ClosedRetreat component.
import ClosedRetreat from "@/components/ClosedRetreat";

export default function MexicoPage() {
  return (
    <ClosedRetreat
      header={{
        chip: "2026 circle · closed",
        title: "Becoming HER Retreat",
        placeAndDates: "Riviera Maya, Mexico · Oct 27 – 31, 2026",
        tagline: "this one has passed. the next one could be yours.",
        footnote: "for the woman ready to bury an old version of herself. not with shame. with reverence.",
        photo: { src: "/images/Mexican jungle.jpeg", alt: "a path through the Mexican jungle in morning light" },
        pinned: { src: "/images/planting ceremony.jpg", alt: "women at the tree-planting ceremony", caption: "rebirth, day four" },
      }}
      week={{
        eyebrow: "what the week holds · Riviera Maya, Mexico",
        heading: "five days. one jungle.",
        body: "a boutique eco-sanctuary in the Caribbean jungle. yoga, sound healing and movement. a cenote visit and a tree-planting ceremony. rituals of release timed to Day of the Dead, Halloween and Samhain, the three most powerful days of the year to let something die.",
        quote: "the fire came to free you.",
        // all from Becoming HER 2026, in a mixed-up order. six tiles + three
        // wide ones fill the 4-column grid with no gaps (see ClosedRetreat).
        collage: [
          { src: "/images/Becoming Her cenote.JPG", alt: "swimming in a cenote" },
          { src: "/images/Becoming Her yoga.JPG", alt: "yoga together around the altar", span: "wide" },
          { src: "/images/Becoming Her candles.JPG", alt: "candles and marigolds laid out for ceremony" },
          { src: "/images/Becoming Her Ashley and I selfie.JPG", alt: "Ashley and Shannon, laughing" },
          { src: "/images/Becoming Her painting.JPG", alt: "painting at the long table" },
          { src: "/images/Becoming Her drawing.JPG", alt: "women journaling and drawing on the floor", span: "wide" },
          { src: "/images/Becoming Her food.JPG", alt: "a plate from the retreat kitchen", span: "wide" },
          { src: "/images/Becoming Her arm raise.JPG", alt: "women raising their arms together in the jungle" },
          { src: "/images/Becoming Her ceremony.JPG", alt: "an evening ceremony by candlelight" },
        ],
      }}
      signUp={{
        listName: "Becoming HER list",
        heading: "be first to know when we return to Mexico",
        body: "bookings are closed for this retreat. leave your name and tell us what's calling you. you'll hear first, before anything is announced.",
        interests: [
          { id: "mexico", label: "the next Mexico retreat" },
          { id: "morocco", label: "the next Morocco retreat" },
          { id: "spain", label: "Casa Amor, Spain · June 2027" },
          { id: "kenya", label: "Into the Wild, Kenya · Nov 2027" },
          { id: "custom", label: "a retreat designed for my group" },
        ],
        defaultPicked: ["mexico"],
      }}
      closing="where endings become beginnings."
      compact
    />
  );
}
