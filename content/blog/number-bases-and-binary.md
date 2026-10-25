---
{
  "title": "Number Bases: Converting Between Binary, Decimal and Hexadecimal",
  "metaTitle": "Converting Number Bases: Binary, Decimal and Hex",
  "description": "How place value works in any base, how to convert decimal to binary by repeated division, why hexadecimal groups four bits, and the mistakes to avoid.",
  "status": "published",
  "editorialReview": "automated",
  "publishedAt": "2026-10-25",
  "updatedAt": "2026-10-25",
  "author": "reign-creative-llc",
  "category": "education-brain",
  "hubs": ["discrete-math"],
  "tags": ["discrete math", "binary", "number bases", "computer science"],
  "primaryKeyword": "converting number bases",
  "secondaryKeywords": [
    "decimal to binary conversion",
    "binary to decimal",
    "binary to hexadecimal",
    "base conversion method",
    "octal and hexadecimal"
  ],
  "intent": "informational",
  "longTailKeywords": [
    "convert 156 to binary step by step",
    "why does hexadecimal use letters",
    "why 0.1 cannot be stored exactly in binary",
    "how many bits to store a number"
  ],
  "aiSearchQuestions": [
    "How do you convert a decimal number to binary?",
    "How do you convert binary to hexadecimal?",
    "Why do computers use binary?",
    "How do place values work in other bases?"
  ],
  "relatedApps": ["discrete-math-study-quiz"],
  "relatedArticles": [
    "boolean-algebra-and-logic-gates",
    "power-set-explained",
    "modular-arithmetic-explained",
    "russian-peasant-multiplication",
    "fraction-decimal-percent-conversions",
    "discrete-math-study-quiz-guide"
  ],
  "takeaways": [
    "In base b, the digits of a number are multiplied by powers of b: 1011 in base 2 is 8 + 0 + 2 + 1 = 11.",
    "To convert a decimal number to base b, divide by b repeatedly and read the remainders from last to first.",
    "Hexadecimal digits each stand for exactly four bits and octal digits for three, so conversion between them and binary is done group by group.",
    "A number below 2ᵏ needs at most k bits; 156 needs 8 bits because 128 ≤ 156 < 256.",
    "Fractions such as 0.1 that terminate in decimal can repeat forever in binary, which is why computers store some decimals only approximately."
  ],
  "disclaimer": "none",
  "featured": false,
  "faqs": [
    {
      "question": "How do you convert a decimal number to binary?",
      "answer": "Divide by 2, write down the remainder, and repeat with the quotient until it reaches 0. The binary digits are the remainders read from the last one to the first. For 41: remainders 1, 0, 0, 1, 0, 1, so 41 = 101001 in binary."
    },
    {
      "question": "How do you convert binary to hexadecimal?",
      "answer": "Group the bits in fours from the right, padding with leading zeros, and replace each group by one hex digit from 0 to F. 10011100 splits into 1001 and 1100, which are 9 and C, so it is 9C in hexadecimal."
    },
    {
      "question": "Why do computers use binary?",
      "answer": "Because circuits are built from switches with two states. Applied Discrete Structures describes the simplest switching device as an on-off switch and writes ON as 1 and OFF as 0, so each switch or gate carries one binary digit. Hexadecimal is then a compact way to write long binary strings, four bits per digit."
    },
    {
      "question": "Why does hexadecimal use letters?",
      "answer": "Base 16 needs sixteen digit symbols, but we only have ten numerals. The letters A to F stand for the values 10 to 15, so the hex number 2F means 2 × 16 + 15 = 47."
    }
  ],
  "sources": [
    {
      "title": "4.3 Converting with Base Systems (Contemporary Mathematics)",
      "publisher": "OpenStax",
      "url": "https://openstax.org/books/contemporary-mathematics/pages/4-3-converting-with-base-systems",
      "accessed": "2026-10-24"
    },
    {
      "title": "Binary Representation of Positive Integers (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-binary_Representation_of_Positive_Integers.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "Base",
      "publisher": "Wolfram MathWorld",
      "url": "https://mathworld.wolfram.com/Base.html",
      "accessed": "2026-10-24"
    },
    {
      "title": "A Brief Introduction to Switching Theory and Logic Design (Applied Discrete Structures)",
      "publisher": "discretemath.org",
      "url": "https://discretemath.org/ads/s-logic-design.html",
      "accessed": "2026-10-24"
    }
  ]
}
---

Base 10 is not the only way to write a number. Binary (base 2) groups units by twos, fours and eights instead of tens and hundreds; octal (base 8) and hexadecimal (base 16) are compact ways to write long binary strings. The same idea, place value, underlies all of them, and converting between bases comes down to two short procedures: multiply out the place values, or divide repeatedly and keep the remainders.

## Place value in any base

In base 10, the digits of 4,372 stand for 4 thousands, 3 hundreds, 7 tens and 2 ones:

4 × 10³ + 3 × 10² + 7 × 10¹ + 2 × 10⁰.

In base b, the place values are powers of b instead, and the digits run from 0 to b − 1. OpenStax's *Contemporary Mathematics* describes the base 10 system exactly this way, as place values that are powers of 10, and then converts between bases using the same principle.

| Base | Name | Digits | Place values (right to left) |
| ---: | --- | --- | --- |
| 2 | Binary | 0, 1 | 1, 2, 4, 8, 16, 32, … |
| 8 | Octal | 0–7 | 1, 8, 64, 512, … |
| 10 | Decimal | 0–9 | 1, 10, 100, 1,000, … |
| 16 | Hexadecimal | 0–9, A–F | 1, 16, 256, 4,096, … |

A subscript shows the base when it might be unclear: 101₂ is five, while 101₁₀ is one hundred and one.

## Converting to decimal: multiply out the place values

**Binary to decimal.** 101101₂ = 1 × 32 + 0 × 16 + 1 × 8 + 1 × 4 + 0 × 2 + 1 × 1 = **45**.

**Hex to decimal.** 2F₁₆ = 2 × 16 + 15 = **47**, since F stands for 15.

**Octal to decimal.** 3752₈ = 3 × 512 + 7 × 64 + 5 × 8 + 2 = 1,536 + 448 + 40 + 2 = **2,026**.

## Converting from decimal: repeated division

To write n in base b, divide by b, record the remainder, and repeat with the quotient until it reaches 0. The remainders, read from **last to first**, are the digits. *Applied Discrete Structures* presents this as its binary conversion algorithm, attaching each remainder to the left-hand end of the list as it goes.

**156 to binary.**

| Division | Quotient | Remainder |
| --- | ---: | ---: |
| 156 ÷ 2 | 78 | 0 |
| 78 ÷ 2 | 39 | 0 |
| 39 ÷ 2 | 19 | 1 |
| 19 ÷ 2 | 9 | 1 |
| 9 ÷ 2 | 4 | 1 |
| 4 ÷ 2 | 2 | 0 |
| 2 ÷ 2 | 1 | 0 |
| 1 ÷ 2 | 0 | 1 |

Reading the remainders from the bottom up: 156 = **10011100₂**. Check: 128 + 16 + 8 + 4 = 156.

**Why it works.** The remainder on division by 2 is the last binary digit, the ones place, because every other place value is even. Dividing by 2 then shifts every remaining digit one place right, so the next remainder is the next digit. It is the same reasoning as the remainders in [modular arithmetic](/blog/modular-arithmetic-explained/).

An alternative for small numbers is to subtract powers of 2 from the largest down: 156 − 128 = 28, 28 − 16 = 12, 12 − 8 = 4, 4 − 4 = 0, so the bits for 128, 16, 8 and 4 are 1.

## Binary, hex and octal: convert in groups

Because 16 = 2⁴, each hexadecimal digit corresponds to exactly four bits. Because 8 = 2³, each octal digit corresponds to three. So these conversions never pass through decimal.

**Binary to hex.** Group from the right in fours, padding the left with zeros:

10011100₂ → 1001 1100 → 9 C → **9C₁₆**.

**Hex to binary.** Replace each digit by its four bits: 7EA₁₆ → 0111 1110 1010 → 11111101010₂.

**Binary to octal.** Group in threes: 11111101010₂ → 011 111 101 010 → **3752₈**, which matches the octal example above, since all three represent 2,026.

It also means two hex digits describe exactly eight bits, so a long binary string shrinks to a quarter of its length in hex.

## How many digits a number needs

A number n needs k bits when 2ᵏ⁻¹ ≤ n < 2ᵏ. 156 lies between 128 = 2⁷ and 256 = 2⁸, so it needs 8 bits. With k bits you can write 2ᵏ different values, 0 to 2ᵏ − 1, the same 2ᵏ that counts the subsets of a k-element set in the [power set guide](/blog/power-set-explained/), and for the same reason: each bit is an independent yes-or-no choice.

## Fractions in other bases

Digits after the point stand for negative powers: 0.101₂ = 1/2 + 0/4 + 1/8 = 0.625. A fraction terminates in base b only if its denominator, in lowest terms, has no prime factors other than those of b. So 1/10 = 0.1 terminates in decimal, but in binary it repeats forever: 0.000110011001100…₂. That is why a computer storing 0.1 and 0.2 in binary floating point holds only approximations; in JavaScript, for example, 0.1 + 0.2 evaluates to 0.30000000000000004.

## Arithmetic in binary

Binary addition uses the familiar column method with the rule 1 + 1 = 10₂, carrying 1. Multiplication is shifting and adding, which is exactly what [Russian peasant multiplication](/blog/russian-peasant-multiplication/) does by halving and doubling. At the hardware level, adding two bits is done by logic gates; the [Boolean algebra and logic gates guide](/blog/boolean-algebra-and-logic-gates/) builds a half adder from them.

## Conversion exercises

1. Convert 2,026 to binary and to hex. (11111101010₂ and 7EA₁₆.)
2. Convert 0xFF to decimal. (255.)
3. How many bits are needed for 1,000? (10, since 512 ≤ 1,000 < 1,024.)
4. Convert 110110₂ to octal and to decimal. (66₈ and 54.)

MathWorld's article on number bases is a useful reference for notation. [Discrete Math: Study & Quiz](/apps/discrete-math-study-quiz/) covers logic, number theory and modular arithmetic, and its tools include a truth-table generator for the Boolean side of binary. See our [education apps](/apps/category/education-brain/), the [fraction, decimal and percent conversions guide](/blog/fraction-decimal-percent-conversions/) for base-10 fluency, or the [discrete math hub](/blog/topics/discrete-math/).
