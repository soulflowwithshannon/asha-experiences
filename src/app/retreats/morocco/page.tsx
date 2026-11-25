// Sacred Sands after bookings closed (Nov 2026). The full sales page — rooms,
// Stripe links, FAQs, day-by-day — is kept in ./_archive for the next Morocco
// retreat. Layout and form live in the shared ClosedRetreat component.
import ClosedRetreat from "@/components/ClosedRetreat";

export default function MoroccoPage() {
  return (
    <ClosedRetreat
      header={{
        chip: "2026 circle · closed",
        title: "Sacred Sands",
        placeAndDates: "Agadir, Morocco · Nov 29 – Dec 5, 2026",
        tagline: "this one's full. the next one could be yours.",
        footnote: "for women to come home to the part of them that's always been whole.",
        photo: { src: "/images/Milky Way Over Ait Benhaddou Village, Morocco.jpeg", alt: "the Milky Way over Ait Benhaddou, Morocco" },
        pinned: { src: "/images/Morocco circle.jpeg", alt: "women sitting in circle at Sacred Sands", caption: "circle, day four" },
      }}
      week={{
        eyebrow: "what the week holds · Agadir, Morocco",
        heading: "seven days. one ancient land.",
        body: "a castle retreat center outside Agadir. sunrise yoga and somatic release. sound healing with Ashley. a fire, and whatever needs to be said around it. the souk, the medina, and long tables with women who stop feeling like strangers by day two.",
        quote: "your worth was never up for debate.",
        shots: [
          { src: "/images/Morocco circle.jpeg", alt: "women's circle" },
          { src: "/images/agadir-medina-888-2.jpg", alt: "the Agadir medina" },
          { src: "/images/Morocco candles.jpeg", alt: "candlelit ceremony", position: "center 90%" },
          { src: "/images/Morocco sunset.jpeg", alt: "sunset over the desert" },
        ],
      }}
      signUp={{
        listName: "Sacred Sands list",
        heading: "be first to know when we return to Morocco",
        body: "bookings are closed for this retreat. leave your name and tell us what's calling you. you'll hear first, before anything is announced.",
        interests: [
          { id: "morocco", label: "the next Morocco retreat" },
          { id: "spain", label: "Casa Amor, Spain · June 2027" },
          { id: "kenya", label: "Into the Wild, Kenya · Nov 2027" },
          { id: "custom", label: "a retreat designed for my group" },
        ],
        defaultPicked: ["morocco"],
      }}
      closing="the desert will still be there. so will we."
      compact
    />
  );
}
