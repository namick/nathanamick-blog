# Writing Style Guide

A collection of useful tips to help large language models adopt a style of prose that more closely aligns with the author's voice and the intended audience. This guide is a living document and will be updated as new insights are discovered.

list the questions the start held back.

list the questions that were held back in the start.

<good>
you have just misread the foundational core of the entire book
</good>
<bad>
you have just misread the load-bearing term of the entire book
</bad>
Explanation: The term "load-bearing" is highly overused by AI right now and should be avoided. "Foundational core" is Just one example, but feel free to use anything else that also gets the point across. 

---

<good>
Many people want to read philosophy but lack the ability to do so. Bridging that specific gap is what I've spent the last several months building a tool for.
</good>
<good>
I have spent the last several months building a tool to bridge the gap between wanting to read philosophy and being able to.
</good>
<good>
That gap (between wanting to read philosophy and being able to) is what I've spent the last several months building a tool for.
</good>
<okay>
That gap, between wanting to read philosophy and being able to, is what I've spent the last several months building a tool for.
</okay>
<bad>
That gap — between wanting to read philosophy and being able to — is what I've spent the last several months building a tool for.
</bad>
Explanation: The em dash is highly overused and should be avoided for now. Craft the response using a deliberate mix of short, punchy sentences and longer, flowing clauses. Focus on rhythmic variety to elevate the prose and give the text an excellent, human-like cadence.

---

<good>
Your computer's current performance is similar to a runner who might be getting tired near the end of a race.
</good>
<bad>
Your computer is a tired runner. It is panting at the finish line and begging for a break.
</bad>
Explanation: The bad example falsely claims a fictional scenario is literally happening, which might confuse readers. The good example uses clear, honest qualifiers to show it is just a helpful analogy. More importantly, this form of Metaphor or illustrative fiction is very much overused by AI, and it gets tired. It might be appropriate in certain cases as emphasis, but generally try to avoid it. 

---

<good>
While an editing pen is not a physical medical tool, you might think of its effects as similar to a scalpel that carefully removes unnecessary parts.
</good>
<bad>
An editing pen isn't a weapon. It's a surgeon's scalpel slicing away the dead weight of your sentences.
</bad>
Explanation: The bad example relies on an aggressive "it's not this, it's that" binary, which states an imaginative concept as a literal fact. The good example uses conditional framing ("you might think of") to guide the reader gently through the analogy.

---

<good>
you have swapped in the wrong meanings and kept reading
</good>
<good>
you have unintentionally swapped in the wrong meanings and kept reading
</good>
<bad>
you have quietly swapped in the wrong meanings and kept reading
</bad>
Explanation: Current AI models are dropping the word "quietly" everywhere you look, it seems. Just avoid that for now. Removing it altogether is preferable unless there's actual meaning there that is needed. In that case, use a different word. Examples include "unconsciously", "inadvertently", "automatically", "instinctively", "passively", etc.

## Sentence clarity — one difficulty per clause

The goal: every sentence
parses correctly in one pass at reading speed, so the reader never backs up to
re-assign who is doing what. Optimize for zero rereads, not minimum word count;
a few extra words that prevent a stumble are always worth it.

Two devices each cost the reader one parsing cycle. Either is affordable alone.
They must never combine in the same clause:

1. **Live personification** — an inanimate subject paired with a verb that
normally takes a human agent ("the start holds back a question", "the paragraph
refuses", "the essay wants"). Contrast a *conventional* pairing, which costs
nothing: information-bearing nouns routinely take verbs like answer, show, say,
suggest ("the ending answers the question", "the report shows"). The test:
would the subject–verb pairing pass unnoticed in casual speech? If it would
raise an eyebrow, it is live, and it spends the clause's one allowance.

2. **Clause compression** — a relative clause with its relativizer dropped
("that", "which", "who", "when", "that were"), especially an object relative,
where the stacked noun phrases force the reader to guess the structure: "the
steps the instructions left out", "every question its start holds back".
Readers rescue these using animacy — "the question the writer holds back"
parses instantly because only the writer can be doing the holding. Give them
two inanimate nouns and a person-verb, and the cue fails: the reader
garden-paths and has to reparse.

When both appear in one clause, rewrite it: mark the clause boundary with its
relativizer, and make the agent implicit (a short passive is fine) or name a
real animate agent.

<bad>a story whose ending answers every question its start holds back</bad>
<good>a story whose ending answers all of the questions that were held back at
the start</good>

Note that "whose ending answers" survives in the good version on purpose:
"answer" is a verb endings take in ordinary English, and that clause is in
plain subject–verb–object order. The rule is a budget, not a ban on inanimate
subjects.

<bad>Explain the steps the instructions left out.</bad>
<good>Explain the steps that were left out of the instructions.</good>

Self-test before shipping any sentence: read it once at speaking speed. If at
any word you must revise what an earlier word was doing, rewrite the sentence.