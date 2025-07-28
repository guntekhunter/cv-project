import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { vfs as openSansVfs } from "@/lib/openSansVfs";
import { DateFormater } from "../DateFormater";

pdfMake.vfs = openSansVfs;

pdfMake.fonts = {
  OpenSans: {
    normal: "OpenSans-Regular.ttf",
    bold: "OpenSans-Bold.ttf",
    italics: "OpenSans-Italic.ttf",
    bolditalics: "OpenSans-BoldItalic.ttf",
  },
};

export const generatePdfTextBased = (data: {
  biodata: any;
  socialMedia: any[];
  groupedSkills: string[];
  jobs: any[];
  educations: any[];
  organisations: any[];
}) => {
  const {
    biodata,
    socialMedia,
    groupedSkills,
    jobs,
    educations,
    organisations,
  } = data;

  const docDefinition: any = {
    pageSize: "A4",
    content: [],
    defaultStyle: {
      fontSize: 10,
      font: "OpenSans",
      lineHeight: 1.3,
    },
    styles: {
      header: { fontSize: 18, bold: true, margin: [0, 0, 0, 4] },
      subheader: {
        fontSize: 12,
        bold: true,
        margin: [0, 12, 0, 4],
        color: "#1F2937",
      },
      textMuted: { color: "#6B7280", fontSize: 7 },
      italic: { italics: true },
      small: { fontSize: 1 },
      medium: { fontSize: 7 },
      bullet: { margin: [0, 2, 0, 2] },
      sectionSpacing: { margin: [0, 0, 0, 8] },
    },
  };

  // Header with Name and Image
  const headerColumns: any[] = [];
  if (biodata?.photo) {
    headerColumns.push({
      image: biodata.photo,
      width: 80,
      margin: [0, 0, 8, 0],
    });
  } else {
    headerColumns.push({ text: "", width: 80 });
  }

  headerColumns.push({
    stack: [
      { text: biodata?.name || "", style: "header" },
      {
        text: [
          ...(socialMedia?.map((s) => s.link_or_number) || []),
          biodata?.myemail,
          biodata?.no_hp,
        ]
          .filter(Boolean) // remove undefined/null/empty
          .join(" | "),
        style: "textMuted",
        margin: [0, 0, 0, 0],
      },
      { text: biodata?.address || "", style: ["italic", "medium"] },
      {
        text: biodata?.professional_summary || "",
        style: ["sectionSpacing", "medium"],
      },
    ],
    width: "*",
  });

  docDefinition.content.push({ columns: headerColumns, columnGap: 10 });

  // Skills

  if (groupedSkills?.length) {
    docDefinition.content.push({
      text: "Keterampilan Teknis, Keterampilan Non Teknis dan Pencapaian",
      style: "subheader",
    });

    docDefinition.content.push({
      canvas: [
        {
          type: "line",
          x1: 0,
          y1: 0,
          x2: 515, // width of A4 page (approx) minus margins
          y2: 0,
          lineWidth: 0.7,
          lineColor: "#000000", // optional: Tailwind gray-300
        },
      ],
      margin: [0, 0, 0, 10], // space above and below line
    });

    docDefinition.content.push({
      ul: groupedSkills.map((skill) => {
        const [boldPart, ...restParts] = skill.split(":");
        const rest = restParts.join(":").trim();

        return {
          text: [
            { text: boldPart + (rest ? ": " : ""), bold: true },
            { text: rest },
          ],
          margin: [0, 2, 0, 2],
        };
      }),
      style: "medium",
    });
  }

  // Work Experience
  if (jobs?.length) {
    docDefinition.content.push({
      text: "Pengalaman Kerja",
      style: "subheader",
    });

    docDefinition.content.push({
      canvas: [
        {
          type: "line",
          x1: 0,
          y1: 0,
          x2: 515, // width of A4 page (approx) minus margins
          y2: 0,
          lineWidth: 0.7,
          lineColor: "#000000", // optional: Tailwind gray-300
        },
      ],
      margin: [0, 0, 0, 10], // space above and below line
    });

    jobs.forEach((job) => {
      const [namePart, ...addressParts] =
        `${job.company_name} - ${job.company_address}`.split("-");
      const address = addressParts.join("-").trim();

      docDefinition.content.push({
        columns: [
          {
            width: "70%",
            text: [
              { text: namePart.trim(), bold: true },
              ...(address
                ? [{ text: " - " + address, style: "textMuted" }]
                : []),
            ],
          },
          {
            text: `${DateFormater(job.start_date)} - ${DateFormater(job.end_date)}`,
            style: "textMuted",
            alignment: "right",
            margin: [12, 0, 0, 0], // This should now work
          },
        ],
        columnGap: 20,
        style: "medium",
        margin: [0, 6, 0, 2],
      });

      if (job.job_type) {
        docDefinition.content.push({
          text: job.job_type,
          style: ["italic", "textMuted"],
        });
      }

      if (job.company_description) {
        docDefinition.content.push({
          text: job.company_description,
          style: "medium",
        });
      }

      if (job.responsibility) {
        const items = job.responsibility
          .split("•") // split by bullet point
          .map((t: string) => t.trim()) // remove extra spaces
          .filter((t: string) => t); // remove empty strings

        if (items.length) {
          items.forEach((i: string) => {
            docDefinition.content.push({
              text: `• ${i}`, // add bullet point back
              style: "medium",
              margin: [12, 0, 0, 0], // optional: small spacing between lines
            });
          });
        }
      }
    });
  }

  // Education
  if (educations?.length) {
    docDefinition.content.push({
      text: "Riwayat Pendidikan",
      style: "subheader",
    });

    docDefinition.content.push({
      canvas: [
        {
          type: "line",
          x1: 0,
          y1: 0,
          x2: 515, // width of A4 page (approx) minus margins
          y2: 0,
          lineWidth: 0.7,
          lineColor: "#000000", // optional: Tailwind gray-300
        },
      ],
      margin: [0, 0, 0, 10], // space above and below line
    });

    educations.forEach((edu) => {
      const [namePart, ...addressParts] =
        `${edu.school_name} - ${edu.school_address}`.split("-");
      const address = addressParts.join("-").trim();
      docDefinition.content.push({
        columns: [
          {
            width: "70%",
            text: [
              { text: namePart.trim(), bold: true },
              ...(address
                ? [{ text: " - " + address, style: "textMuted" }]
                : []),
            ],
            // style: "medium",
          },
          {
            width: "30%",
            text: `${DateFormater(edu.start_date)} - ${DateFormater(edu.end_date)}`,
            style: "textMuted",
            alignment: "right",
          },
        ],
        columnGap: 10, // 👈 Add this to create space between columns
        style: "medium",
        margin: [0, 6, 0, 2],
      });

      if (edu.education_type === "universitas") {
        docDefinition.content.push({
          text: `${edu.major}, IPK ${edu.ipk}`,
          style: ["italic", "medium"],
        });
      }
    });
  }

  // Organisation
  if (organisations?.length) {
    docDefinition.content.push({
      text: "Pengalaman Berorganisasi",
      style: "subheader",
    });

    docDefinition.content.push({
      canvas: [
        {
          type: "line",
          x1: 0,
          y1: 0,
          x2: 515, // width of A4 page (approx) minus margins
          y2: 0,
          lineWidth: 0.7,
          lineColor: "#000000", // optional: Tailwind gray-300
        },
      ],
      margin: [0, 0, 0, 10], // space above and below line
    });

    organisations.forEach((org) => {
      const [namePart, ...addressParts] =
        `${org.organisation_name} - ${org.address}`.split("-");
      const address = addressParts.join("-").trim();
      docDefinition.content.push({
        columns: [
          {
            width: "70%",
            text: [
              { text: namePart.trim(), bold: true },
              ...(address
                ? [{ text: " - " + address, style: "textMuted" }]
                : []),
            ],
            style: "medium",
          },
          {
            width: "30%",
            text: `${DateFormater(org.start_date)} - ${DateFormater(org.end_date)}`,
            style: "textMuted",
            alignment: "right",
          },
        ],
        margin: [0, 6, 0, 2],
      });

      if (org.division) {
        docDefinition.content.push({
          text: org.division,
          style: ["italic", "textMuted"],
        });
      }

      if (org.responsibility) {
        const items = org.responsibility
          .split("\n")
          .filter((t: string) => t.trim());
        if (items.length)
          items.forEach((i: any) => {
            docDefinition.content.push({
              text: i,
              style: "medium",
              margin: [12, 0, 0, 0], // optional: small spacing between lines
            });
          });
      }
    });
  }

  // Generate PDF
  pdfMake.createPdf(docDefinition).download("resume.pdf");
};
