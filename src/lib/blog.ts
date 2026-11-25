import { SPOTS_LEFT } from "@/lib/kenya";

export type Post = {
  slug: string;
  title: string;
  /** Overrides `title` in the <title> tag and og:title. Keep under ~40 characters: the "| ASHA Experiences" suffix is added after it. */
  metaTitle?: string;
  /** Meta description, and the italic block under the post title. */
  description: string;
  /** One or two sentences under the title on journal cards. Under 160 characters. */
  summary?: string;
  date: string;
  /** Set when a post is refreshed: shown as "updated …" and used as dateModified. */
  updated?: string;
  readTime: string;
  theme: string;
  /** Also appears under the "destinations" filter chip on /blog. */
  destination?: boolean;
  /**
   * Drafts render at their URL (noindex) so they can be previewed, but are
   * left out of the journal index and the sitemap. Delete the flag to publish.
   */
  draft?: boolean;
  image?: string;
  body: string;
};

/* ---------- retreat CTAs ----------
   The dated, priced part of each destination post lives here, not in the
   post bodies, so the posts stay evergreen. Update these after the retreat
   (or when the price or payment plan changes) and every post follows. */

// Same link as MeetUs.tsx (a client module, so it can't be imported here).
const CALENDAR_URL = "https://calendar.app.google/Yt1VUQGEuhhEipt59";

const kenyaCta = `
<hr />

<h2>Into the Wild: Kenya, 2027</h2>
<p>Our next safari retreat is <strong>Into the Wild</strong>, at Ol Pejeta Conservancy from <strong>November 28 to December 4, 2027</strong>. Seven days, no more than ten women, and both of us, Ashley and Shannon, on the ground with you all week.</p>
<ul>
<li><strong>$6,900</strong> for a shared cottage${SPOTS_LEFT ? `, with <strong>${SPOTS_LEFT} of 10 spots left</strong>` : ""}</li>
<li>hold your spot with a <strong>$1,000 deposit</strong>. book by December 31, 2026 and the rest is 11 monthly payments of $537. after that, we split it evenly over the months that are left</li>
<li>all payments are non-refundable</li>
</ul>
<p><a href="/retreats/kenya">See the week and reserve your spot</a>, or <a href="${CALENDAR_URL}" target="_blank" rel="noopener noreferrer">book a call with us</a> first if you'd rather talk it through.</p>
`;

const spainCta = `
<hr />

<h2>Casa Amor: Andalusia, June 2027</h2>
<p>Casa Amor is planned for <strong>June 15 to 20, 2027</strong>. It isn't open for booking yet, so the best way to get a spot is to be on the list. <a href="/retreats/spain-waitlist">Join the waitlist</a> and you'll hear first when it opens.</p>
<p>Want to talk it through first? <a href="${CALENDAR_URL}" target="_blank" rel="noopener noreferrer">Book a call with us</a>.</p>
`;

const allPosts: Post[] = [
  {
    slug: "10-signs-youre-ready-for-a-womens-retreat",
    title: "10 signs you're ready for a women's retreat",
    description: "You've been putting everyone else first for so long you can't remember what you actually want. Sound familiar? Here are 10 signs it might be time.",
    summary: "Always the one holding it all together? Ten honest signs it might be time for a women's retreat, and who actually comes.",
    date: "2026-08-18",
    readTime: "6 min read",
    theme: "the inner work",
    image: "/images/Return to Love group sunset.jpg",
    body: `
<p>There's a specific kind of tired that sleep doesn't fix.</p>

<p>You wake up already behind. You move through your days doing everything for everyone — and somewhere along the way, you stopped being able to answer the question: <em>what do I actually want?</em></p>

<p>A women's retreat isn't a vacation. It's intentional time away from your responsibilities, your roles, your routines — to actually hear yourself again.</p>

<p>Here are 10 signs you might be ready.</p>

<ol>
<li><strong>You can't remember the last time you did something just for you.</strong> Not a haircut. Not a quick dinner. Something that required you to show up fully, just for yourself.</li>
<li><strong>You're running on empty — but you can't stop.</strong> Burnout doesn't always look like falling apart. Sometimes it looks like being incredibly functional while feeling hollow inside.</li>
<li><strong>You've been the strong one for too long.</strong> You're the one everyone leans on. The one who holds it together. And you're tired — not because you don't love the people in your life, but because no one has held space for you in a long time.</li>
<li><strong>You've outgrown the version of yourself you've been living as.</strong> Something has shifted. The life you built doesn't fit anymore. You're ready to step into something more aligned, but you don't know what that looks like yet.</li>
<li><strong>You crave real connection — not small talk.</strong> You want conversations that go beneath the surface. You want to be in a room full of women who are also asking the real questions.</li>
<li><strong>Your nervous system is fried.</strong> You're reactive. You're anxious. Your body has been in survival mode for so long it's forgotten what it feels like to actually settle.</li>
<li><strong>You keep saying "one day I'll do something like that."</strong> You've seen retreats. You've thought about them. But life doesn't slow down — you have to choose to step out of it.</li>
<li><strong>You're at a crossroads.</strong> A relationship. A career. A city. A version of yourself. Something is ending and you need space to figure out what comes next.</li>
<li><strong>You've been prioritizing everyone else's healing but your own.</strong> You've supported friends, held your family together, made space for everyone's growth — and your own healing got pushed to the back of the list.</li>
<li><strong>You feel the pull and you're scared.</strong> Something in you is drawn to this — and something else is coming up with reasons not to do it. That friction? That's usually the sign.</li>
</ol>

<h2>Who comes on retreat</h2>
<p>There's no one type of woman who comes on retreat. But there are patterns, and maybe you'll recognize yourself in one of them.</p>

<ul>
<li><strong>The woman who has been holding it together for everyone.</strong> Capable, competent, and completely exhausted. She's been the strong one for so long she's forgotten she's allowed to need something too.</li>
<li><strong>The woman at a crossroads.</strong> She's not broken. She's between versions of herself, and needs space to figure out who she's becoming.</li>
<li><strong>The woman who gave herself away.</strong> In a relationship, in motherhood, in a job that required everything, until she genuinely doesn't know what she wants anymore.</li>
<li><strong>The woman who is already doing the work.</strong> She meditates, sees a therapist, reads the books. She's coming to go deeper, in community with other women doing the same.</li>
<li><strong>The woman who almost didn't come.</strong> She talked herself out of it twice. She came anyway, and can't imagine who she'd be right now if she hadn't.</li>
</ul>

<h2>What they all have in common</h2>
<ul>
<li>They're done waiting for the right time</li>
<li>They know, at some level, that something needs to shift</li>
<li>They've chosen, however nervously, to say yes to themselves</li>
</ul>

<p>That's it. That's the only requirement.</p>

<hr />

<p>If more than a few of these landed — you already know.</p>

<p>We run small, intimate <a href="/retreats">women's retreats</a>. Each one is designed to give you the time, the space, and the container to come back to yourself.</p>

<p>You don't have to have it all figured out before you go. You just have to say yes.</p>
    `.trim(),
  },
  {
    // was womens-retreats-2026-ultimate-guide (301 in next.config.ts)
    slug: "womens-retreats-2027-ultimate-guide",
    title: "Women's retreats 2027: the ultimate guide to finding the right one",
    metaTitle: "Women's retreats 2027: the ultimate guide",
    description: "Looking for a women's retreat in 2027? How to cut through the noise: what to look for, what to avoid, and how to find the one that's right for you.",
    summary: "How to choose a women's retreat in 2027: what to look for, what to be wary of, and the questions to ask before you book.",
    date: "2026-11-24",
    updated: "2026-11-25",
    readTime: "7 min read",
    theme: "before you go",
    image: "/images/women laying down.jpeg",
    body: `
<p>The women's retreat industry has exploded. And that's mostly a good thing — more women choosing themselves, more spaces being created to hold them.</p>

<p>But it also means the options are overwhelming. How do you know which retreat is actually worth your time, your money, and your trust?</p>

<p>Here's what to look for.</p>

<h2>Start with the why</h2>
<p>Before you search, get clear on what you're actually looking for. The right retreat depends entirely on where you are right now.</p>

<ul>
<li><strong>Do you need rest and beauty?</strong> → look for a retreat with a slower pace, luxurious setting, plenty of free time</li>
<li><strong>Do you need to go deep?</strong> → look for skilled facilitation, somatic or ceremonial practices, smaller groups</li>
<li><strong>Do you need community?</strong> → look for a retreat that prioritizes group connection over solo experience</li>
<li><strong>Do you need all three?</strong> → that's most of us, honestly</li>
</ul>

<h2>What to look for in a retreat</h2>

<p><strong>Skilled facilitators</strong> — who are the people running this? What's their training, their background, their actual experience? A beautiful location with unqualified facilitation is just a holiday.</p>

<p><strong>Small group size</strong> — the best retreats are intimate. You can't go deep in a room of 40 strangers. Look for groups of 8–16 women maximum.</p>

<p><strong>A clear container</strong> — what is the retreat actually for? "Wellness" is not an answer. Look for a retreat that can articulate what it's designed to create and how.</p>

<p><strong>Real testimonials</strong> — not just star ratings. Look for women describing actual experiences, specific moments, what shifted for them.</p>

<p><strong>What's included</strong> — hidden costs are a red flag. A well-run retreat tells you exactly what's covered so you can arrive without surprises.</p>

<h2>What to be cautious of</h2>
<ul>
<li>Retreats that promise transformation without explaining how they create it</li>
<li>Facilitators with no verifiable training or credentials</li>
<li>Very large groups marketed as "community"</li>
<li>Pressure tactics — urgency, scarcity, aggressive follow-up</li>
<li>No clear refund or cancellation policy</li>
</ul>

<h2>Questions to ask before you book</h2>
<ul>
<li>What does a typical day look like?</li>
<li>How many women will be in the group?</li>
<li>What training do the facilitators have?</li>
<li>What happens if I need support during or after the retreat?</li>
<li>What's the cancellation policy?</li>
</ul>

<p>A retreat worth booking will answer all of these without hesitation.</p>

<h2>Types of retreats to know about</h2>

<p><strong>Yoga retreats</strong> — movement-focused, often in beautiful locations. Great for physical reset and community. Depth varies widely by facilitator.</p>

<p><strong>Wellness retreats</strong> — broad category. Can mean spa-focused or deeply transformational — read carefully to know which you're getting.</p>

<p><strong>Transformational retreats</strong> — designed specifically for inner work. Usually involve somatic practices, ceremony, and skilled facilitation. These are the ones that change things.</p>

<p><strong>Adventure retreats</strong> — combine meaningful experience (safari, hiking, cultural immersion) with inner work. The setting becomes part of the medicine.</p>

<h2>ASHA women's retreats in 2027</h2>
<p>We run small, intentional retreats for women. Here's what's coming up:</p>
<ul>
<li><strong><a href="/retreats/spain-waitlist">Casa Amor, Spain</a></strong>: five nights in Andalusia, between the countryside of Vejer de la Frontera and the beaches of the Costa de la Luz. Planned for June 15 to 20, 2027. The waitlist is open now.</li>
<li><strong><a href="/retreats/kenya">Into the Wild, Kenya</a></strong>: seven days on safari at Ol Pejeta Conservancy, November 28 to December 4, 2027. No more than ten women. Booking now.</li>
<li><strong><a href="/retreats/morocco">Sacred Sands, Morocco</a></strong>: dates for the next one aren't set yet. Leave your name on the page and we'll tell you first.</li>
<li><strong><a href="/retreats/custom">A custom retreat</a></strong>: designed around you and your group.</li>
</ul>
<p>Every ASHA retreat has:</p>
<ul>
<li>Small groups, so you're known by name, not lost in a crowd</li>
<li>Skilled facilitation in yoga, sound healing, somatic practices, and ceremony</li>
<li>A clear arc, from arrival to integration, designed with intention</li>
</ul>

<hr />

<p>If you're trying to figure out which retreat is right for you — ours or otherwise — <a href="/contact">reach out</a>. We'd rather help you find the right fit than have you book something that isn't.</p>
    `.trim(),
  },
  {
    // target search: "what to pack for a safari in Kenya"
    slug: "what-to-pack-for-a-safari-in-kenya",
    title: "What to pack for a safari in Kenya (when it's also a retreat)",
    metaTitle: "What to pack for a safari in Kenya",
    description: "What to pack for a safari in Kenya when it's also a retreat: layers for cold sunrise drives, what to leave at home, and the small things women forget.",
    summary: "Layers for cold sunrise drives, the one thing Kenya won't let you bring in, and everything you can happily leave at home.",
    date: "2026-11-25",
    readTime: "6 min read",
    theme: "before you go",
    destination: true,
    image: "/images/kenya-safari-jeep.JPG",
    body: `
<p>Most packing lists for a safari in Kenya are written for people who'll spend the whole trip in a vehicle behind a long lens. This one is for a safari that's also a retreat: sunrise game drives, yes, but also yoga looking out over the plains, women's circles, long dinners, and a lot of time sitting still.</p>

<p>Here's what to pack for a safari in Kenya, and what you can leave behind.</p>

<h2>First, the weather surprises everyone</h2>
<p>People picture Africa and pack for heat. But Ol Pejeta sits high up, near the base of Mount Kenya, and the air is cool and dry. Midday can be warm in the sun. Early mornings and evenings can be properly cold, especially in an open vehicle at sunrise.</p>

<p>Late November and early December can also bring the tail end of Kenya's short rains, so plan for a shower or two.</p>

<p><strong>So the answer is layers. Always layers.</strong></p>

<h2>What to pack for a safari in Kenya: the list</h2>

<p><strong>For game drives</strong></p>
<ul>
<li>a warm fleece or a light down jacket for sunrise and sunset drives</li>
<li>a light rain jacket that packs small</li>
<li>a scarf or buff, for the cold and for the dust</li>
<li>a hat with a brim and good sunglasses. you're close to the equator, and the sun is stronger than it feels</li>
<li>neutral colors, like khaki, olive, sand and soft browns. they hide the dust and blend in around wildlife</li>
<li>binoculars. bring your own pair, even a small one. you'll use them more than you think</li>
</ul>

<p><strong>For the retreat side</strong></p>
<ul>
<li>comfortable clothes you can move in for yoga and gentle practice</li>
<li>something warm and soft for evening circles around the fire</li>
<li>a journal, and a pen you actually like writing with</li>
<li>an outfit or two for dinners that makes you feel good. nothing fancy</li>
<li>a light travel yoga mat</li>
</ul>

<p><strong>For your body</strong></p>
<ul>
<li>high SPF sunscreen, and lip balm with SPF</li>
<li>a good moisturizer. the dry air is real</li>
<li>any medication you take, in your carry-on, with a few extra days' worth</li>
<li>closed, comfortable shoes for walking, plus sandals for around the cottages</li>
</ul>

<p>You don't need to pack shampoo, conditioner or drinking water. The cottages provide them, along with water bottles to refill.</p>

<p><strong>The practical things</strong></p>
<ul>
<li>your passport, valid for at least six months beyond your travel dates</li>
<li>your approved Kenyan eVisa, printed and saved on your phone</li>
<li>a plug adapter. Kenya uses the three-pin, UK-style plug (Type G)</li>
<li>a power bank and your charger</li>
<li>some cash for gratuities for staff and guides. we suggest $100–$200 in total, and it goes a long way</li>
<li>a copy of your travel insurance details</li>
</ul>

<h2>The one thing not to pack</h2>
<p>Plastic bags. Kenya banned single-use plastic bags in 2017, and that includes the ones so many of us use for shoes and toiletries. Pack with fabric pouches or packing cubes instead.</p>

<h2>What you can leave at home</h2>
<ul>
<li>the full safari costume. you don't need to look like a documentary host</li>
<li>heavy hiking boots. most of the week happens in safari vehicles, on the verandah and in circle</li>
<li>a hair dryer. the cottages run on solar power, so it's one less thing to carry</li>
<li>the version of you who needs a plan for every outfit</li>
</ul>

<h2>A note on bags</h2>
<p>A lot of Kenya safaris use small bush planes, with strict weight limits and soft bags only. Ours doesn't: we travel together from Nairobi to Ol Pejeta by road, about four to five hours. Still, pack light enough that you can lift your own bag, and leave a little room for what you bring home.</p>

<p>Once you're booked, you'll get a full pre-travel guide from us, so you won't be working this out alone.</p>

<h2>The real packing list</h2>
<p>Beyond the layers and the sunscreen, the most useful thing you can bring is room. Room in your days that you don't rush to fill, and room in yourself for something to shift.</p>

<p>Still deciding? These might help: <a href="/blog/a-day-on-safari-at-ol-pejeta">a day on safari at Ol Pejeta</a> and <a href="/blog/going-on-a-womens-retreat-alone-heres-what-happened">going on a women's retreat alone</a>.</p>
${kenyaCta}
    `.trim(),
  },
  {
    // target search: "is Kenya safe for women travelers". Rebuilt from Shannon's draft (Nov 2026).
    // Time-sensitive: re-check the advisory section before publishing and every few months after.
    slug: "is-kenya-safe-for-women-travelers",
    title: "Is Kenya safe for women travelers? (honest answer)",
    metaTitle: "Is Kenya safe for women travelers?",
    description: "Is Kenya safe for women travelers? An honest answer: what the official advice says, where the real risks are, and how we plan our safari retreat around them.",
    summary: "What the official advice says right now, where the real risks are, and how we've built our Kenya safari retreat around them.",
    date: "2026-11-25",
    readTime: "6 min read",
    theme: "before you go",
    destination: true,
    draft: true,
    image: "/images/kenya-women-tent.JPG",
    body: `
<p>Is Kenya safe for women travelers? Yes, with the right planning, but it deserves an honest answer rather than a pep talk. It's the question we hear most from women thinking about Into the Wild, our Kenya retreat, and it's a fair one.</p>

<p>[PLACEHOLDER: Shannon or Ashley, your line here. "The first time I went to Kenya, I was nervous about ___, and what I found was ___."]</p>

<p>Here's what we tell every woman who asks: what the official advice says right now, where the real risks are, and how we've built this retreat around them.</p>

<h2>What the official advice says right now</h2>
<p>As of November 2026, the US State Department rates Kenya <strong>Level 3, "Reconsider Travel."</strong> It was raised from Level 2 in October 2026 because of health risks, at a time when Kenya had confirmed cases of Ebola.</p>

<p>The advisory also lists crime, kidnapping, terrorism, unrest and road safety. Most of those risks are concentrated in specific places:</p>
<ul>
<li><strong>Do-not-travel areas:</strong> the northeastern border counties, the far north coast above Malindi, and parts of the northwest near Ethiopia and in West Pokot and Turkana. None are on our route.</li>
<li><strong>Nairobi:</strong> petty crime is common, and protests can turn violent, mostly in Nairobi and western Kenya.</li>
<li><strong>Women specifically:</strong> the State Department notes that sexual assault is often unreported, and that incidents have happened in bars, on beaches and at some lodges. It advises solo travelers to take extra care.</li>
</ul>
<p>[PLACEHOLDER: check this section against the current advisory on travel.state.gov just before publishing. We couldn't load the official page to confirm the do-not-travel areas or the note on women.]</p>

<p>We're sharing this because you deserve the full picture. Advisory levels change. We watch them closely, and we'll tell every woman who books exactly where things stand before we travel. Read the current advisory yourself on <a href="https://travel.state.gov/en/international-travel/travel-advisories/kenya.html" target="_blank" rel="noopener noreferrer">travel.state.gov</a>.</p>

<h2>Why safari at Ol Pejeta feels different</h2>
<p>Most of our time in Kenya is spent inside Ol Pejeta Conservancy, a protected wildlife area of about 90,000 acres in Laikipia, far from crowds and city streets.</p>

<p>We stay at Ol Pejeta Safari Cottages, a small, family-run property with only a handful of cottages. Each cottage is exclusive-use, so you share it only with the women on your retreat and a dedicated team: a private chef, a server, a professional safari guide and a private vehicle. No strangers at the next table, no shared game drives.</p>

<p>Whenever you're out in the conservancy, you're with a trained guide who knows the land and the animals.</p>

<h2>How we travel together</h2>
<p>You're never navigating Kenya on your own. Into the Wild is a small group of women, led by Shannon and Ashley the whole way.</p>
<ul>
<li><strong>Group transport from Nairobi.</strong> We travel together from Nairobi to Ol Pejeta, so you never have to arrange a ride or find your way.</li>
<li><strong>Small group, always together.</strong> Off-site outings happen as a group, with a guide.</li>
<li><strong>Licensed, insured partners.</strong> The State Department recommends checking that lodges and operators carry insurance and a Kenya Tourism Regulatory Authority license. We check this for our partners.</li>
<li><strong>We keep watching.</strong> We follow the travel advisory and CDC guidance in the lead-up, and stay in touch with our partners on the ground.</li>
</ul>
<p>[PLACEHOLDER: Shannon, confirm every bullet above is true for this retreat, and add specifics, e.g. airport pickup, who meets women on arrival, the emergency plan.]</p>

<h2>Practical tips for women traveling to Kenya</h2>
<ul>
<li><strong>Get travel insurance with medical evacuation.</strong> Medical care outside the big cities is limited, and hospitals usually want payment up front.</li>
<li><strong>Check the CDC before you go.</strong> Look at the current health notices for Kenya, and talk to your doctor about vaccines and malaria tablets.</li>
<li><strong>Enroll in STEP.</strong> The State Department's free Smart Traveler program sends you alerts and helps the embassy reach you.</li>
<li><strong>Keep valuables low-key.</strong> Leave flashy jewelry at home, and be careful at ATMs and at night in Nairobi.</li>
<li><strong>Dress for the bush.</strong> Neutral colors like khaki and beige, layers for cool mornings and evenings, and closed-toe shoes for walks. Here's <a href="/blog/what-to-pack-for-a-safari-in-kenya">everything else to pack</a>.</li>
<li><strong>Share your plans.</strong> Give someone at home our itinerary and set a time to check in.</li>
<li><strong>Buckle up.</strong> Roads in the conservancy are rough. Wear your seatbelt on game drives and transfers.</li>
</ul>

<h2>So, is Kenya safe for women?</h2>
<p>No place is risk-free, and right now Kenya carries a higher official warning than usual. What makes the difference is how you travel: with a small group, trusted guides and a team that tracks every update for you.</p>

<p>If you've felt Kenya calling but the fear has kept you from saying yes, we'd love to talk it through. <a href="/contact">Ask us anything</a>, or read <a href="/blog/a-day-on-safari-at-ol-pejeta">what a day on safari at Ol Pejeta is really like</a>.</p>

<h2>Sources</h2>
<ul>
<li><a href="https://travel.state.gov/en/international-travel/travel-advisories/kenya.html" target="_blank" rel="noopener noreferrer">US State Department: Kenya travel advisory</a></li>
<li><a href="https://www.cnbcafrica.com/2026/us-says-travelers-should-reconsider-kenya-trips-on-health-risks-amid-ebola-spread" target="_blank" rel="noopener noreferrer">Reuters via CNBC Africa: US says travelers should reconsider Kenya trips (October 2026)</a></li>
<li><a href="https://nation.africa/kenya/health/us-raises-kenya-travel-advisory-over-ebola-as-nairobi-assures-visitors-5642618" target="_blank" rel="noopener noreferrer">Nation: US raises Kenya travel advisory over Ebola</a></li>
</ul>
${kenyaCta}
    `.trim(),
  },
  {
    // target search: "safari at Ol Pejeta"
    slug: "a-day-on-safari-at-ol-pejeta",
    title: "A day on safari at Ol Pejeta: sunrise game drives, circles, and the last northern white rhinos",
    metaTitle: "A day on safari at Ol Pejeta Conservancy",
    description: "What a safari at Ol Pejeta is really like: sunrise game drives, circles on the plains, the last northern white rhinos, and what surprises first-timers.",
    summary: "Cold sunrise drives, circles on the plains, and two rhinos who are the last of their kind. What a day at Ol Pejeta actually feels like.",
    date: "2026-11-25",
    readTime: "6 min read",
    theme: "the experience",
    destination: true,
    image: "/images/rhino conservation.jpg",
    body: `
<p>If you've only seen a safari on a screen, you probably picture the animals. You don't picture the cold at dawn, or the hush in the vehicle when an elephant steps onto the track, or what it's like to sit in a circle with women you met three days ago while the light goes gold over the plains.</p>

<p>This is what a safari at Ol Pejeta is actually like, when it's also a retreat.</p>

<h2>Where you are</h2>
<p>Ol Pejeta Conservancy is 90,000 acres of open plains and acacia woodland near the base of Mount Kenya. It's the largest black rhino sanctuary in East Africa, and the Big Five live here. We stay inside the conservancy at Ol Pejeta Safari Cottages, so the wildlife isn't a drive away. It's right outside.</p>

<h2>A day on safari at Ol Pejeta</h2>
<p>No two days are the same, and nothing runs to the minute. But most days have a shape.</p>

<p><strong>Before sunrise.</strong> Up around 5:30. Ol Pejeta sits almost on the equator, so the sun comes up at about the same time all year. Coffee or tea, every layer you brought, and out into the vehicles as the sky starts to change. Early morning is when a lot of animals are on the move, and the light is at its softest.</p>

<p><strong>Morning.</strong> Back for breakfast. Then yoga, meditation or journaling looking out over the plains, and some days a workshop.</p>

<p><strong>Midday.</strong> The slow part. Lunch, rest, a nap, a book on the verandah. We protect this time on purpose.</p>

<p><strong>Late afternoon.</strong> A sunset drive, as the heat goes out of the day.</p>

<p><strong>Evening.</strong> Dinner together, and on some nights a women's circle or a ceremony around the fire.</p>

<h2>The circles</h2>
<p>The game drives are what bring most women to Kenya. The circles are often what they take home.</p>

<p>A circle is simple: a small group of women, sitting together, taking turns to speak and to listen. Nobody has to share. You can listen the whole time if that's what you need. Some women go deep on the first night, others watch for a day or two first, and both are welcome.</p>

<p>If you want to know more about how a retreat week unfolds, read <a href="/blog/what-actually-happens-at-a-womens-retreat-day-by-day">what actually happens at a women's retreat</a>.</p>

<h2>The last northern white rhinos</h2>
<p>One day of the week is a full day out in the conservancy, including a visit to the Northern White Rhino Sanctuary.</p>

<p>Ol Pejeta is home to the last two northern white rhinos in the world, Najin and Fatu. Both are female, so the subspecies can't recover on its own, and scientists are working on ways to bring it back.</p>

<p>It's part of why we chose Ol Pejeta. The conservancy fees from our week go back into its conservation work.</p>

<h2>What first-timers don't expect</h2>
<ul>
<li><strong>The cold.</strong> High elevation means sunrise drives are chilly. Bring the fleece (here's <a href="/blog/what-to-pack-for-a-safari-in-kenya">what else to pack</a>).</li>
<li><strong>How quiet it is.</strong> Engine off, nobody talking, just the plains. It can be the part you remember most.</li>
<li><strong>You won't see everything on every drive.</strong> Some drives are full of animals. Some are mostly sky. Both are worth it.</li>
<li><strong>The altitude.</strong> You might feel more tired than usual on the first day. Go easy.</li>
<li><strong>How much you'll feel.</strong> Being that close to something wild has a way of cracking things open. Don't be surprised if you cry at an elephant.</li>
<li><strong>Being mostly offline.</strong> The cottages have basic wifi: enough to text home, not enough to scroll. If you need more, get a local Safaricom SIM or eSIM.</li>
</ul>

<h2>The rest of the week</h2>
<p>Alongside the drives, there's a visit to Spinners and Weavers, a picnic out in the wild, a traditional Kenyan cooking class with our hosts, and long dinners that run late. And on the last morning, one more sunrise before the drive back to Nairobi.</p>

<p>What happens after you get home matters too. We wrote about that in <a href="/blog/what-happens-after-a-retreat-integration">the integration no one talks about</a>. And here's <a href="/blog/what-to-pack-for-a-safari-in-kenya">what to pack for a safari in Kenya</a>.</p>
${kenyaCta}
    `.trim(),
  },
  {
    // target search: "women's retreats in Spain" (+ 2027)
    slug: "womens-retreats-in-spain-2027",
    title: "Women's retreats in Spain 2027: what we're planning",
    metaTitle: "Women's retreats in Spain 2027",
    description: "Looking at women's retreats in Spain for 2027? Here's what we're planning for Casa Amor in Andalusia, what the week will feel like, and how to hear first.",
    summary: "A white hilltop town, the beaches of the Costa de la Luz, and slow June evenings. A first look at Casa Amor, our 2027 retreat in Spain.",
    date: "2026-11-25",
    readTime: "4 min read",
    theme: "the experience",
    destination: true,
    draft: true,
    image: "/images/Vejer de la Frontera.jpeg",
    body: `
<p>If you've been looking at women's retreats in Spain for 2027, here's a first look at what we're planning: <strong>Casa Amor</strong>, five nights in Andalusia in June 2027.</p>

<p>It isn't open for booking yet. This is us thinking out loud, so you know what's coming.</p>

<h2>Why Andalusia</h2>
<p>[PLACEHOLDER: in your own words, why you chose Spain, and this corner of it, for Casa Amor]</p>

<p>Casa Amor sits between the countryside around Vejer de la Frontera, a small white town on a hill in the province of Cádiz, and the beaches of the Costa de la Luz on the Atlantic coast. It's a slower, quieter Spain than most people picture.</p>

<p>Spain is also one of the easiest places in Europe to travel on your own, and Vejer is small and walkable.</p>

<h2>What a women's retreat in Spain could feel like</h2>
<p>Here's what we're planning for the week. Some of it may change as we finalize the details.</p>
<ul>
<li>slow mornings, and a real siesta. June in Andalusia is warm, so afternoons slow right down</li>
<li>a saltwater pool to float in</li>
<li>candlelit dinners in the garden</li>
<li>beach picnics on the Costa de la Luz</li>
<li>a sunset horseback ride along the beach</li>
<li>a flamenco class, and a live show in Vejer</li>
<li>sound baths, circles, and time to actually rest</li>
</ul>
<p>[PLACEHOLDER: check this list against the final Casa Amor itinerary before publishing]</p>

<h2>Who it's for</h2>
<p>The same women who come on every ASHA retreat: women who've spent years putting everyone else first and are ready to come back to themselves.</p>

<p>You don't need to know anyone. Most women who come on retreat with us arrive on their own (here's <a href="/blog/going-on-a-womens-retreat-alone-heres-what-happened">what that's really like</a>). We're keeping the group small. [PLACEHOLDER: group size, e.g. "no more than 10 women"]</p>

<h2>What we don't know yet</h2>
<ul>
<li><strong>price and rooms:</strong> [PLACEHOLDER: price and room options, once set]</li>
<li><strong>getting there:</strong> [PLACEHOLDER: which airport we'll collect everyone from]</li>
</ul>

<p>If you're weighing up the cost of a retreat in general, <a href="/blog/how-to-afford-a-womens-retreat">how to afford a women's retreat</a> might help. And if you're comparing options, our <a href="/blog/womens-retreats-2027-ultimate-guide">2027 guide to women's retreats</a> covers what to look for in any of them.</p>
${spainCta}
    `.trim(),
  },
  {
    slug: "who-am-i-outside-of-my-roles",
    title: "Who am I outside of all the roles I carry?",
    description: "A journaling practice for women who've lost themselves in busyness and distraction. 4 prompts to help you reconnect with who you actually are.",
    summary: "Four journaling prompts for when you've spent so long in your roles that you've lost track of who you are underneath them.",
    date: "2026-09-02",
    readTime: "5 min read",
    theme: "the inner work",
    image: "/images/IMG_3342.jpg",
    body: `
<p>I felt shocked when I realized I didn't really know who I was.</p>

<p>And honestly — maybe I never gave myself the space to find out.</p>

<p>I was always on the go. Numbing out with alcohol, distractions, staying busy enough that the question never had room to surface. And when it finally did, I didn't have an answer.</p>

<p>That was uncomfortable. But it was also the most important moment of my life.</p>

<p>Because it was the first time I stopped running long enough to actually ask.</p>

<p>If you're reading this, something in you is asking too.</p>

<p>Maybe you've been so deep in the doing — the work, the relationships, the showing up for everyone else — that you've lost the thread back to yourself.</p>

<p>Maybe you're at a crossroads. Something ended, something shifted, and now you're standing in a gap wondering who you actually are outside of all of it.</p>

<p><strong>You don't need to have the answer yet. You just need to be willing to sit with the question.</strong></p>

<h2>Why we stop asking</h2>

<p>It's easier not to.</p>

<p>Staying busy, staying needed, staying distracted — these aren't character flaws. They're how a lot of us learned to cope with not feeling like enough just as we are.</p>

<p>But at some point the noise stops working. The distraction stops sticking. And what's underneath starts asking to be seen.</p>

<p><em>That's not a breakdown. That's your inner voice getting louder because you're finally ready to hear it.</em></p>

<h2>A journaling practice to start coming home</h2>

<p>20 minutes. Somewhere quiet. Phone face down. No right answers.</p>

<p><strong>1. Who was I before I learned to be useful?</strong><br />
What did you love before the roles stacked up? What made you feel alive before you started optimizing your life around everyone else's needs?</p>

<p><strong>2. Which roles am I wearing that no longer fit?</strong><br />
Not the ones you want to shed entirely. Just the ones that feel tight. The version of you that made sense once but is ready for an update.</p>

<p><strong>3. What have I been numbing that's worth feeling?</strong><br />
This one takes courage. What are the distractions actually covering? What would you find if you got quiet enough to look?</p>

<p><strong>4. Who am I outside of what I do for others?</strong><br />
Sit with this one. <em>"I don't know"</em> is a completely valid answer. Write it down anyway. That's where it starts.</p>

<h2>This isn't about fixing yourself</h2>

<p>It's about stopping long enough to remember that there's a self worth coming back to.</p>

<p>I spent years not giving myself that space. The retreats I now lead exist because I finally did — and what I found on the other side changed everything.</p>

<p>You don't have to figure it all out today.</p>

<p><strong>You just have to start asking.</strong></p>

<hr />

<p>Ready for more than a journaling practice? We'd love to have you with us on <a href="/retreats">one of our retreats</a>.</p>
    `.trim(),
  },
  {
    slug: "how-to-create-joy-you-dont-have-to-earn",
    title: "How to create joy you don't have to earn",
    description: "Joy isn't waiting on the other side of your goals. A practice for women who've been rationing happiness — and are ready to start living in the present moment.",
    summary: "A short practice for women who keep putting happiness off until later. Joy you don't have to earn, starting right where you are.",
    date: "2026-09-02",
    readTime: "4 min read",
    theme: "the inner work",
    image: "/images/IMG_3160.jpg",
    body: `
<p>Pure joy, I've realized, is pure presence.</p>

<p>It's the moment when you're not trying to fix anything, change anything, or get anywhere. When the present moment is so full that there's no room for the mental noise that usually follows you around.</p>

<p>I know that feeling now. But it took me a long time to get here — and honestly, I'm still learning it.</p>

<p>Because I have goals. Passions. Projects I care deeply about and am always working toward. The drive doesn't go away and I don't want it to. But somewhere along the way I started treating joy like a reward I hadn't quite earned yet. Like I'd allow myself to fully land in a moment <em>after</em> I'd done enough, achieved enough, figured enough out.</p>

<p><strong>The problem is "enough" never actually arrives.</strong></p>

<p>So you keep moving. Keep grinding. Keep putting the good stuff on layaway for a version of your life that's always just around the corner.</p>

<p>And meanwhile, the moments that are trying to show you that you're exactly where you're meant to be — you're half in them. Checking your phone. Running the mental to-do list. Already thinking about what's next.</p>

<p>I've had moments in Guatemala, sitting at the edge of Lake Atitlán watching the sun set over the volcano, where I thought — <em>this is it. This is the whole point.</em> Not the destination, not the achievement. Just this. Just being alive inside a moment this extraordinary.</p>

<p>Those moments don't ask you to have it all figured out first. They just ask you to show up.</p>

<p><strong>That's what joy actually requires. Not achievement. Presence.</strong></p>

<p>And presence is a practice — especially for women who've spent years in their heads, running on adrenaline, measuring their worth in output.</p>

<h2>The practice</h2>

<p>This one isn't about journaling prompts as much as it is about noticing.</p>

<p><strong>1. Notice when you're half in a moment.</strong><br />
Not to judge yourself — just to catch it. The dinner you're eating while scrolling. The conversation you're in while mentally composing your to-do list. The beautiful evening you're documenting instead of experiencing. Just notice.</p>

<p><strong>2. Ask yourself: what would it feel like to fully land here?</strong><br />
Not forever. Just for this moment. What would you have to put down — mentally, physically — to actually be inside this experience instead of observing it from a slight distance?</p>

<p><strong>3. Find one moment a day that doesn't need to be productive.</strong><br />
A coffee on the balcony before the day starts. A walk with no destination. A conversation you're not rushing. Something small that exists purely because it feels good. No justification required.</p>

<p><strong>4. When joy shows up, let it be enough.</strong><br />
This is the hardest one. Joy has a way of being immediately followed by guilt — <em>I should be working, I should be doing more, this is indulgent.</em> When that voice shows up, notice it. Then choose to stay in the moment anyway.</p>

<h2>Joy isn't on the other side of your goals</h2>

<p>It's available right now, in the life you're already living — if you're willing to actually be in it.</p>

<p>You were made for more than surviving your own life. You were made for moments that take your breath away.</p>

<p><strong>Start collecting them. They're already there.</strong></p>

<hr />

<p>Ready to experience what full presence actually feels like — in one of the most extraordinary places on earth? We'd love to have you with us on <a href="/retreats">one of our retreats</a>.</p>
    `.trim(),
  },
  {
    slug: "journaling-practice-for-women-at-a-crossroads",
    title: "A journaling practice for women at a crossroads",
    description: "Feeling stuck, or like something needs to change but you don't know what? A journaling practice for women standing between chapters and ready to find their footing.",
    summary: "Stuck between chapters and not sure what comes next? A journaling practice for finding your footing when nothing feels clear yet.",
    date: "2026-09-02",
    readTime: "4 min read",
    theme: "the inner work",
    image: "/images/where-theres-peace.jpeg",
    body: `
<p>It feels like something is wrong.</p>

<p>Not a crisis you can point to. Not a problem with an obvious solution. Just this quiet, persistent feeling that you're not where you're supposed to be — and you can't figure out what it is you're supposed to be figuring out.</p>

<p>That's what a crossroads actually feels like. Not a dramatic fork in the road with clear signs. More like standing in a fog, knowing you need to move but not sure which direction.</p>

<p>It tends to show up at transition points. A relationship ends. A job that used to feel meaningful stops feeling that way. Or maybe nothing dramatic happened at all — you just woke up one day and realized you've been on autopilot for longer than you can remember.</p>

<p><strong>Whatever brought you here, you're not lost. You're just between chapters.</strong></p>

<p>And that space — as uncomfortable as it is — means something in you is ready to shift.</p>

<h2>Why uncertainty feels unbearable</h2>

<p>We're not taught to sit in it. We're taught to fix it, solve it, move forward. So when the answer isn't clear, we either force a decision before we're ready — or we stay frozen, waiting for clarity that never comes because we're too busy drowning out <em>the quiet voice that actually has the answers.</em></p>

<p>Journaling isn't about forcing clarity. It's about creating enough stillness that you can finally hear yourself think.</p>

<h2>The practice</h2>

<p>No pressure to have answers. Just show up honestly.</p>

<p><strong>1. What does my life look like right now versus what I actually want it to feel like?</strong><br />
Not the logistics — the feeling. What's the gap between where you are and where something in you knows you could be?</p>

<p><strong>2. What have I been ignoring because it feels too big or too scary to look at?</strong><br />
The thing you keep circling back to and then pushing away. Write it down. You don't have to act on it yet — just stop pretending it isn't there.</p>

<p><strong>3. If I trusted myself completely, what would I do?</strong><br />
Take away the fear, the opinions of other people, the practicalities. What does your gut actually say?</p>

<p><strong>4. What chapter is ending — and what does that ask me to let go of?</strong><br />
Crossroads almost always involve grief. Naming what you're leaving behind is just as important as imagining what comes next.</p>

<p><strong>5. What would it mean to stop waiting for permission to move forward?</strong><br />
Who are you waiting for? And what if that permission was yours to give yourself all along?</p>

<h2>Clarity comes from movement</h2>

<p>Not from waiting. You don't need to have it all figured out — you just need to stop pretending you're okay standing still.</p>

<p>Start there. Get honest with yourself on paper. You'll find your footing.</p>

<p><strong>You already are — otherwise you wouldn't be here asking the question.</strong></p>

<hr />

<p>Ready for more than a journaling practice? We'd love to have you with us on <a href="/retreats">one of our retreats</a>.</p>
    `.trim(),
  },
  {
    slug: "how-to-talk-to-your-partner-about-a-solo-womens-retreat",
    title: "How to talk to your partner about going on a solo women's retreat",
    description: "The retreat calls to you. Your partner isn't sure. Here's how to have the conversation — and why this decision matters more than it might seem.",
    summary: "Want to go on a solo retreat but bracing for the conversation at home? How to talk to your partner honestly, and what if they say no.",
    date: "2026-08-19",
    readTime: "5 min read",
    theme: "before you go",
    image: "/images/ReturnToLove25-357.jpg",
    body: `
<p>You've found the retreat. Something in you knows it's right. And then you think about telling your partner — and you feel yourself already bracing.</p>

<p>Maybe you're anticipating pushback about the cost. Maybe about the timing. Maybe about you leaving for a week to go <em>"find yourself"</em> abroad, which sounds, from the outside, like something people say before they don't come back the same.</p>

<p>Here's how to have that conversation.</p>

<h2>Start with the why — yours</h2>
<p>Before you talk to your partner, get clear with yourself on why you actually want to go. Not the defensive version (<em>"I deserve this"</em>). The honest version.</p>
<ul>
<li>What are you carrying right now that isn't sustainable?</li>
<li>What do you need that your daily life isn't giving you?</li>
<li>What do you think this retreat might give you — for yourself and for the relationship?</li>
</ul>

<p>When you can answer those questions clearly, the conversation becomes much easier. You're not asking for permission. You're sharing something real.</p>

<h2>Lead with what's true</h2>
<p>Not: <em>"I just really want to do this."</em></p>
<p>But: <em>"I've been running on empty for a long time and I think this is what I actually need."</em></p>

<p>Most partners who push back aren't pushing back on the retreat — they're responding to the version of it they're imagining. The more clearly you can describe what you're actually seeking, the less mysterious it becomes.</p>

<h2>Address the real concerns directly</h2>

<p><strong>The cost</strong> — put it in context. What have you spent over the past year trying to feel better? Therapy, supplements, courses, the things you bought hoping they'd fill the gap? A retreat is often less, over time, and does more.</p>

<p><strong>The timing</strong> — there is never a perfect time. If you wait for one, you'll wait forever. What would need to be covered? Who needs to know? Make a plan together rather than asking your partner to accept vague logistics.</p>

<p><strong><em>"Why do you need to go alone?"</em></strong> — this is the real question. Because there are things that only become possible when you step outside your roles. You can't be someone's partner and parent and friend and still access the version of yourself that exists underneath all of that — not fully, not in five days. The retreat isn't away from your relationship. It's for it.</p>

<h2>What often surprises partners</h2>
<p>The woman who comes home.</p>

<p>Partners who were hesitant before the retreat are, in the vast majority of cases, deeply glad afterward. Not because the woman changed into someone unrecognizable — but because she came back more herself. Less depleted. More present. With things to say that she couldn't access before.</p>

<h2>If the answer is still no</h2>
<p>That's worth sitting with. Is this a <em>"not yet"</em> or a <em>"never"</em>? Is your partner genuinely concerned, or are they uncomfortable with the idea of you having something that's just yours?</p>

<p>Those are different conversations. And both of them matter.</p>

<hr />

<p>Whatever the conversation looks like — we're here if you have questions. <a href="/retreats">Our retreats</a> are small, intentional, and designed for exactly the woman who almost didn't let herself come. <a href="/contact">Reach out</a> if you want to talk it through.</p>
    `.trim(),
  },
  {
    slug: "what-actually-happens-at-a-womens-retreat-day-by-day",
    title: "What actually happens at a women's retreat? (a day-by-day breakdown)",
    description: "Not the brochure version. A real, honest look at what each day of a women's retreat actually feels like — from the first morning to the last goodbye.",
    summary: "Not the brochure version. What each day of a women's retreat actually looks and feels like, from the nervous first morning to goodbye.",
    date: "2026-08-19",
    readTime: "8 min read",
    theme: "the experience",
    image: "/images/Morocco yoga.png",
    body: `
<p>Most retreat websites show you the photos. The yoga at sunrise. The long table dinners. The women laughing by the pool.</p>

<p>What they don't always show you is what it actually <em>feels</em> like — hour by hour, day by day, from the moment you arrive to the moment you have to leave.</p>

<p>Here's a real breakdown.</p>

<h2>Day 1 — arrival</h2>
<p>You land. You're picked up. You arrive at the property and it's more beautiful than the photos.</p>

<p>And then — almost immediately — something in you starts to exhale. You don't know why yet. Maybe it's the air. Maybe it's that no one needs anything from you.</p>

<ul>
<li>You meet the other women — there's a mix of nerves and warmth in the room</li>
<li>There's usually a welcome circle — an opening ritual to mark the beginning</li>
<li>An early dinner together, unhurried, with conversation that goes deeper than you expected for day one</li>
<li>An early night — most women are surprised by how tired they are</li>
</ul>

<p>What most women feel on day 1 → relief, a little disorientation, and the beginning of something they can't name yet.</p>

<h2>Day 2 — settling in</h2>
<p>The first full day. This is usually when the schedule begins properly.</p>
<ul>
<li>Morning movement — yoga, breathwork, or gentle stretching before breakfast</li>
<li>A nourishing breakfast with no agenda, no phones, no rushing</li>
<li>A morning session — this might be a sound healing, a guided visualization, a somatic practice, or a workshop</li>
<li>Free time in the afternoon — this is harder than it sounds for women who are used to being constantly productive</li>
<li>An evening experience — ceremony, journaling, or a group share</li>
</ul>

<p>What most women feel on day 2 → the beginnings of real connection with the other women. Something starts to open.</p>

<h2>Day 3 — the shift</h2>
<p>Something happens around day 3. It's different for every woman, but it's almost universal.</p>

<p>The wall comes down. Something surfaces — a feeling, a realization, a release. Sometimes it's tears. Sometimes it's laughter. Sometimes it's just a very quiet knowing.</p>

<ul>
<li>The practices go deeper</li>
<li>Conversations with the other women become more honest</li>
<li>You start to feel less like a visitor and more like you belong here</li>
</ul>

<p>What most women feel on day 3 → something cracks open. This is the day most women remember most.</p>

<h2>Day 4 — integration begins</h2>
<p>After the opening comes the integrating. Day 4 is often quieter, more internal.</p>
<ul>
<li>Space to journal, reflect, and process what's come up</li>
<li>A day experience — in Morocco this might be a desert excursion; in Kenya, a safari morning</li>
<li>Conversations with women who are becoming real friends</li>
</ul>

<p>What most women feel on day 4 → grounded. Present. Like time is moving differently.</p>

<h2>Day 5 (and beyond) — the closing</h2>
<p>The last day always comes too soon.</p>
<ul>
<li>A closing ceremony — marking the end with intention, not just logistics</li>
<li>Final group share — what each woman is taking home</li>
<li>The goodbyes, which are harder than expected for women who met five days ago</li>
</ul>

<p>What most women feel on the last day → grief mixed with gratitude. And something solid in their chest that wasn't there before.</p>

<h2>The practices you'll encounter</h2>

<p><strong>Sound healing</strong> — uses singing bowls, drums, and tuning forks to shift your nervous system. It sounds abstract until you're lying there and feel something release in your chest that you didn't know was held there.</p>

<p><strong>Ceremony</strong> — intentional ritual. Setting intentions, releasing what you're ready to let go of, marking a transition. No specific belief system required. Just willingness.</p>

<p><strong>Somatic practices</strong> — body-based work. The body holds what the mind can't always process. Moving, breathing, and feeling can unlock things that talking alone can't reach.</p>

<h2>The part most women say surprised them most</h2>
<p>The other women.</p>

<p>Most people arrive a little nervous about the group dynamic. And then, almost without exception, something happens within the first day or two and the walls come down. Women who are strangers start talking like they've known each other for years.</p>

<p>There's a specific kind of connection that forms when women are honest with each other in the same container. It's faster and deeper than most friendships built over years of surface-level interaction.</p>

<h2>What you don't have to do</h2>
<ul>
<li>Share anything you don't want to share</li>
<li>Participate in anything that doesn't feel right</li>
<li>Have a breakthrough</li>
<li>Arrive knowing what you need</li>
</ul>

<p>You just have to show up.</p>

<h2>What no schedule can capture</h2>
<p>The moments between the schedule. The conversation over breakfast that changes something. The woman who says the thing you've been thinking for years. The silence by the pool where you finally just <em>are</em>.</p>

<p>That's what a retreat actually is.</p>

<hr />

<p><a href="/retreats">Our retreats</a> are each designed with this arc in mind — enough structure to feel held, enough space to actually land. If you want to know more about what a specific retreat looks like day by day, <a href="/contact">reach out</a>.</p>
    `.trim(),
  },
  {


    slug: "how-to-afford-a-womens-retreat",
    title: "How to afford a women's retreat (and why it's worth the investment)",
    description: "The price tag can feel like the reason not to go. Here's a different way to look at it — and practical ways women actually make it happen.",
    summary: "The price can feel like the reason not to go. How to think about what a retreat costs, and the practical ways women make it work.",
    date: "2026-08-10",
    readTime: "6 min read",
    theme: "before you go",
    image: "/images/ReturnToLove bracelets.jpg",
    body: `
<p>The first thing most women do when they find a retreat they love is look at the price. And then close the tab.</p>

<p>We want to talk honestly about it — because the way most of us have been taught to think about money and self-investment is specifically designed to keep us from choosing ourselves.</p>

<h2>Let's put the number in context</h2>
<p>A 5-day retreat that includes accommodation, all meals, experiences, and facilitation — compared to what?</p>

<ul>
<li>A week at a resort where you come home rested but unchanged → similar price, different outcome</li>
<li>Months of therapy, wellness purchases, courses, and self-help books → often more, over time</li>
<li>The cost of continuing as you are — chronic stress, relationships that suffer, opportunities you don't take → incalculable</li>
</ul>

<p>We're not saying it's not a real investment. It is. We're saying it's worth asking: <em>compared to what?</em></p>

<h2>Practical ways women make it happen</h2>
<ul>
<li><strong>Ask for it as a gift</strong> — birthday, milestone, holiday. Share the link. Make the ask. The women in your life who want to support you need to know what you actually want</li>
<li><strong>Start a dedicated savings fund</strong> — even $200/month set aside 12 months out makes a retreat achievable for most people. Name the account something that reminds you what it's for</li>
<li><strong>Use travel points</strong> — the right credit card can cover your flights entirely. Many women offset or eliminate flight costs this way</li>
<li><strong>Talk to your employer</strong> — if the retreat has elements of resilience or burnout recovery, some women have made this case successfully as professional development</li>
<li><strong>Notice what you'll stop spending</strong> — the month before a retreat, women naturally spend less on the things they were using to cope with the life they haven't changed yet</li>
</ul>

<h2>Retreat or vacation?</h2>
<p>A vacation gives you a break from your environment: rest, fun, novelty, and a return home feeling rested but largely unchanged. Sometimes that's exactly what you need.</p>

<p>A retreat gives you a container for something to actually shift. Facilitated practices chosen to take you somewhere, women who are there for the same intentional reason, and the possibility of coming home not just rested, but different.</p>

<ul>
<li><strong>Vacation</strong> — you're tired and you just need to stop for a minute</li>
<li><strong>Retreat</strong> — you're tired <em>and</em> something needs to change</li>
</ul>

<p>A lot of women who come on our retreats say some version of this: <em>"I thought I just needed a vacation, but I realized I needed something more. I needed to actually look at my life."</em></p>

<h2>The harder question</h2>
<p>What would you tell your best friend if she said: <em>"I really want to go but I can't afford to prioritize myself right now"?</em></p>

<p>You'd probably tell her — that's exactly the reason to go.</p>

<p>We have spent years as women making ourselves smaller, more affordable, more convenient for everyone around us. A retreat is one place where you get to practice something different. That practice has a cost. It also has a return.</p>

<hr />

<p><a href="/retreats">Our retreats</a> are priced to include as much as possible — no surprise costs when you arrive. If you have questions about what's included, <a href="/contact">we're happy to walk you through it</a>.</p>
    `.trim(),
  },
  {
    slug: "going-on-a-womens-retreat-alone-heres-what-happened",
    title: "Going on a women's retreat alone — here's what happened",
    description: "Most women who come on retreat don't know a single person going. What it's really like to arrive alone, in their own words.",
    summary: "Most women who come on retreat don't know a single person going. What it's really like to arrive alone, in their own words.",
    date: "2026-08-19",
    readTime: "4 min read",
    theme: "the experience",
    image: "/images/5.png",
    body: `
<p>Most of the women who arrive at an ASHA experience don't know a single person going.</p>

<p>They booked alone. They traveled alone. They showed up to a place full of strangers, with a bag full of things they weren't sure they'd need, and a quiet hope that this would be worth it.</p>

<p>Almost every single one of them says it was the best decision they made that year.</p>

<p>We asked some of them to share what it was actually like — <em>what surprised them, what shifted, what they wish they'd known before they came.</em></p>

<p>We'll let them tell it.</p>

__TESTIMONIAL_VIDEO__

<h2>What we hear most</h2>
<p>After every retreat, we stay in touch with the women who came. And across every group, across every destination, the same things come up.</p>
<ul>
<li>The not-knowing-anyone part disappeared faster than they expected</li>
<li>The women they met became some of the most real friendships they have</li>
<li>Something shifted that they're still integrating weeks later</li>
<li>They wish they'd done it sooner</li>
</ul>

<h2>The question we get asked most</h2>
<p><strong><em>"Is it weird to go alone?"</em></strong></p>

<p>Honestly — no. Most people are in the same position. And there's something about arriving without history, without the version of yourself that your existing relationships know, that makes the whole experience more open. You get to just be a woman in a room with other women. It turns out that's enough.</p>

<hr />

<p><a href="/retreats">Our retreats</a> are small and intentional. If you're thinking about coming alone, <a href="/contact">reach out</a>. We'll tell you exactly what to expect.</p>
    `.trim(),
  },
  {
    slug: "what-is-sound-healing",
    title: "What is sound healing — and does it actually work?",
    description: "Sound healing shows up at almost every women's retreat. Here's what it actually is, what the science says, and what most people feel during a session.",
    summary: "What sound healing actually is, what the science says, and what most people feel during their first session.",
    date: "2026-07-28",
    readTime: "5 min read",
    theme: "the inner work",
    image: "/images/sound healing.jpg",
    body: `
<p>If you've seen "sound healing" or "sound bath" on a retreat schedule and thought — what does that even mean? — you're not alone.</p>

<p>It sounds abstract. Maybe a little out there. And yet it's one of the practices that women consistently say surprised them most — because they felt something they didn't expect to feel.</p>

<h2>What is it?</h2>
<p>Sound healing uses specific instruments to create frequencies that affect your nervous system, body, and emotional state.</p>

<p>Common instruments include:</p>
<ul>
<li>Crystal or Tibetan singing bowls</li>
<li>Gongs</li>
<li>Tuning forks</li>
<li>Drums</li>
<li>The voice</li>
</ul>

<p>A "sound bath" means you lie down, close your eyes, and are immersed in layers of sound. There's nothing you have to do. You just receive it.</p>

<h2>What's actually happening in your body</h2>
<ul>
<li>Sound travels through the body as vibration</li>
<li>Different frequencies shift your brainwave state — from busy beta waves down to alpha (relaxed awareness) or theta (between waking and sleep)</li>
<li>Research shows it can reduce cortisol, lower heart rate, and reduce anxiety</li>
<li>The vagus nerve — central to nervous system regulation — responds directly to sound and low-frequency vibration</li>
</ul>

<h2>What people actually experience</h2>
<p>It varies — and none of these are wrong:</p>
<ul>
<li>Deep relaxation — the kind that feels different from sleep</li>
<li>Emotions surfacing they didn't know were there</li>
<li>Colors or images behind closed eyes</li>
<li>Vibration in specific parts of the body</li>
<li>Unexplained tears</li>
<li>Simply — calm</li>
</ul>

<h2>Does it work?</h2>
<p>If you mean: will one session permanently fix anxiety or trauma? No. Nothing does that in one session.</p>

<p>If you mean: will you feel different afterward? Almost certainly yes.</p>

<p>The nervous system response is real. The state shift is real. For many people, something moves — emotionally or physically — that had been stuck.</p>

<p>Used consistently, sound healing is a legitimate nervous system regulation practice with a growing body of research behind it.</p>

<hr />

<p>You don't need to believe in it for it to work. You just have to be willing to lie down and listen.</p>

<p>Sound healing is woven through every one of our retreat experiences. Our next is <a href="/retreats/kenya">Into the Wild in Kenya</a>, November 28 – December 4, 2027.</p>
    `.trim(),
  },
  {
    slug: "what-happens-after-a-retreat-integration",
    title: "What happens after a retreat — the integration no one talks about",
    description: "The retreat ends. You fly home. And then something unexpected happens. Here's what integration actually looks like, and how to make it last.",
    summary: "The retreat ends, you fly home, and something unexpected happens. What integration really looks like, and how to make the shift last.",
    date: "2026-08-15",
    readTime: "5 min read",
    theme: "the experience",
    image: "/images/ReturnToLove girls group.jpg",
    body: `
<p>Nobody warns you about the week after.</p>

<p>You've had this profound experience. You felt things crack open. You cried with women you'd known for four days. You watched the sun set and thought: <em>this is what my life is supposed to feel like.</em></p>

<p>And then you fly home.</p>

<p>Your inbox is full. Your kids need dinner. Your partner asks "how was it?" and you open your mouth and nothing that comes out captures what actually happened.</p>

<p>This is integration. And it's the part most people aren't prepared for.</p>

<h2>What integration actually is</h2>
<p>Integration is the process of weaving what you experienced — the insights, the shifts, the things you felt or released — into the fabric of your regular life.</p>

<p>Without it → a retreat can feel like a beautiful dream you can barely remember a month later.</p>
<p>With it → what happened on that trip keeps unfolding for months.</p>

<h2>Why it can feel hard at first</h2>
<ul>
<li>You've just spent days in a completely different environment — different pace, people, food, air</li>
<li>Your nervous system recalibrated — then stepped back into the same environment that shaped your old patterns</li>
<li>The contrast can feel jarring</li>
</ul>

<p>Some women feel a low-grade grief in the first few days home. Some feel irritable or overstimulated. Some feel more sensitive than usual. All of this is normal. Your system is trying to land.</p>

<h2>What actually helps</h2>
<ul>
<li><strong>Protect the slowness</strong> — don't schedule yourself into oblivion the week you get back</li>
<li><strong>Write it down</strong> — what shifted? What do you want to carry forward? What are you leaving behind? Journaling in the first week locks in insights that otherwise fade</li>
<li><strong>Stay in connection</strong> — the women you met on retreat are one of the most valuable things you're bringing home. Group chats, check-in calls, even a voice note</li>
<li><strong>Notice what you don't want to go back to</strong> — integration often surfaces clarity about relationships, jobs, patterns. Don't push those realizations away</li>
<li><strong>Be patient with the people at home</strong> — they haven't been where you've been. That's okay. You don't need them to fully understand</li>
</ul>

<h2>How long does it take?</h2>
<p>It varies.</p>
<ul>
<li>Some shifts settle in a few weeks</li>
<li>Some keep unfolding for months</li>
<li>Some women make a major life decision six months after a retreat — a conversation they couldn't have had before, a boundary they finally drew</li>
</ul>

<p>The retreat plants something. Integration is what lets it grow.</p>

<hr />

<p>We think about integration as part of the retreat design itself — not an afterthought. <a href="/retreats">Explore our upcoming retreats</a>.</p>
    `.trim(),
  },
];

/** Published posts only: the journal index and the sitemap read this. */
export const posts: Post[] = allPosts.filter((p) => !p.draft);

/** Drafts included, so a draft can be previewed at its URL. */
export function getPost(slug: string): Post | undefined {
  return allPosts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return allPosts.map((p) => p.slug);
}
