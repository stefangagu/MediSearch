export const doctors = [
  {
    id: 1,
    name: "Dr. Ana Popescu",
    specialty: "Cardiologie",
    clinics: [
      { name: "Clinica Inimii Albastre", city: "București", address: "Str. Plantelor nr. 22, Sector 2, București" }
    ],
    rating: 4.8,
    reviewCount: 23,
    reviews: [
      {
        id: "r1",
        author: "M. I.",
        date: "2025-10-12",
        rating: 5,
        text: "Explicații foarte clare, consult profesionist. M-am simțit în siguranță."
      },
      {
        id: "r2",
        author: "A. P.",
        date: "2025-08-03",
        rating: 4,
        text: "Foarte atentă, dar a fost ușor întârziere la programare."
      },
      {
        id: "r3",
        author: "C. D.",
        date: "2025-05-21",
        rating: 5,
        text: "Recomand. A ascultat, a pus întrebări și a explicat pașii următori."
      }
    ]
  },
  {
    id: 2,
    name: "Dr. Mihai Ionescu",
    specialty: "Dermatovenerologie",
    clinics: [
      { name: "DermaCare", city: "Cluj-Napoca", address: "Str. Memorandumului nr. 14, Cluj-Napoca, jud. Cluj" }
    ],
    rating: 4.4,
    reviewCount: 12,
    reviews: [
      {
        id: "r1",
        author: "L. R.",
        date: "2025-11-09",
        rating: 4,
        text: "Consultație eficientă și recomandări practice."
      },
      {
        id: "r2",
        author: "N. T.",
        date: "2025-06-14",
        rating: 5,
        text: "Tratamentul a funcționat, comunicare foarte bună."
      }
    ]
  },
  {
    id: 3,
    name: "Dr. Elena Dumitrescu",
    specialty: "Pediatrie",
    clinics: [
      { name: "LittleSteps Medical", city: "Timișoara", address: "Bd. Take Ionescu nr. 56, Timișoara, jud. Timiș" }
    ],
    rating: null,
    reviewCount: 0,
    reviews: []
  },
  {
    id: 4,
    name: "Dr. Radu Stan",
    specialty: "Ortopedie și traumatologie",
    clinics: [
      { name: "MoveWell Ortopedie", city: "Iași", address: "Str. Păcurari nr. 110, Iași, jud. Iași" }
    ],
    rating: 4.3,
    reviewCount: 3,
    reviews: [
      { id: "r4-1", author: "G. M.", date: "2025-11-05", rating: 5, text: "Operație reușită, recuperare rapidă. Mulțumesc pentru profesionalism." },
      { id: "r4-2", author: "T. L.", date: "2025-09-18", rating: 4, text: "Consultul a fost detaliat. Puțin timp de așteptare, dar merită." },
      { id: "r4-3", author: "D. C.", date: "2025-07-02", rating: 4, text: "Explicații clare despre tratament, am înțeles tot ce trebuia să fac." }
    ]
  },
  {
    id: 5,
    name: "Dr. Ioana Marinescu",
    specialty: "Neurologie",
    clinics: [
      { name: "NeuroPoint", city: "București", address: "Calea Victoriei nr. 155, Sector 1, București" }
    ],
    rating: 4.6,
    reviewCount: 3,
    reviews: [
      { id: "r5-1", author: "R. B.", date: "2025-12-01", rating: 5, text: "Cel mai bun neurolog la care am fost. Ascultă cu atenție și explică pe înțeles." },
      { id: "r5-2", author: "M. S.", date: "2025-10-14", rating: 4, text: "Consultul a durat mai puțin decât mă așteptam, dar am primit toate răspunsurile." },
      { id: "r5-3", author: "A. D.", date: "2025-08-22", rating: 5, text: "Am revenit pentru control și am fost impresionat de cât de bine ține evidența pacienților." }
    ]
  },
  {
    id: 6,
    name: "Dr. Andrei Georgescu",
    specialty: "Medicină de familie",
    clinics: [
      { name: "PrimaryCare Hub", city: "Brașov", address: "Str. Lungă nr. 30, Brașov, jud. Brașov" }
    ],
    rating: 4.2,
    reviewCount: 3,
    reviews: [
      { id: "r6-1", author: "O. P.", date: "2025-11-20", rating: 4, text: "Medicul de familie ideal — disponibil, calm și orientat spre pacient." },
      { id: "r6-2", author: "L. V.", date: "2025-09-05", rating: 5, text: "M-a îndrumat rapid către specialistul potrivit. Comunicare foarte bună." },
      { id: "r6-3", author: "C. N.", date: "2025-06-30", rating: 4, text: "Cabinet ordonat, personal amabil. Recomand pentru consultații de rutină." }
    ]
  },
  {
    id: 7,
    name: "Dr. Sorina Petrescu",
    specialty: "Endocrinologie",
    clinics: [
      { name: "MetaboHealth", city: "Constanța", address: "Bd. Tomis nr. 201, Constanța, jud. Constanța" },
      { name: "Centrul Medical Endomed", city: "București", address: "Str. Dionisie Lupu nr. 44, Sector 1, București" }
    ],
    rating: 4.5,
    reviewCount: 3,
    reviews: [
      { id: "r7-1", author: "I. F.", date: "2025-10-08", rating: 5, text: "A identificat rapid problema și mi-a ajustat tratamentul. Rezultate vizibile în 3 săptămâni." },
      { id: "r7-2", author: "B. M.", date: "2025-08-11", rating: 4, text: "Consultul a fost complet, analize bine interpretate. Aș fi vrut mai mult timp pentru întrebări." },
      { id: "r7-3", author: "E. T.", date: "2025-05-17", rating: 4, text: "Profesionistă și atentă la detalii. Programările sunt respectate cu punctualitate." }
    ]
  },
  {
    id: 8,
    name: "Dr. Vlad Rusu",
    specialty: "Oftalmologie",
    clinics: [
      { name: "ClearView Ochi", city: "Sibiu", address: "Str. Mitropoliei nr. 18, Sibiu, jud. Sibiu" }
    ],
    rating: 4.1,
    reviewCount: 3,
    reviews: [
      { id: "r8-1", author: "H. A.", date: "2025-11-15", rating: 4, text: "Consultul a fost rapid și eficient. Ochelarii recomandați sunt perfecți." },
      { id: "r8-2", author: "K. S.", date: "2025-09-28", rating: 4, text: "Cabinet dotat modern. Explicații clare despre starea ochilor." },
      { id: "r8-3", author: "N. G.", date: "2025-07-10", rating: 4, text: "Am revenit an de an. Nu am avut niciodată o problemă cu programarea sau consultul." }
    ]
  },
  {
    id: 9,
    name: "Dr. Cristina Nistor",
    specialty: "Obstetrică-ginecologie",
    clinics: [
      { name: "WomenFirst", city: "Oradea", address: "Str. Republicii nr. 5, Oradea, jud. Bihor" }
    ],
    rating: 4.9,
    reviewCount: 3,
    reviews: [
      { id: "r9-1", author: "S. R.", date: "2025-12-10", rating: 5, text: "Am trecut prin sarcină cu toată încrederea datorită ei. Empatie și profesionalism la cel mai înalt nivel." },
      { id: "r9-2", author: "V. I.", date: "2025-10-03", rating: 5, text: "Recomand tuturor prietenelor mele. Răspunde la întrebări cu răbdare și claritate." },
      { id: "r9-3", author: "P. C.", date: "2025-08-19", rating: 5, text: "Cea mai bună experiență medicală pe care am avut-o. Mă simt în siguranță la fiecare vizită." }
    ]
  }
];