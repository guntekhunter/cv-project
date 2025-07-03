import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { vfs as openSansVfs } from "@/lib/openSansVfs";

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
      textMuted: { color: "#6B7280" },
      italic: { italics: true },
      small: { fontSize: 8 },
      bullet: { margin: [0, 2, 0, 2] },
      sectionSpacing: { margin: [0, 4, 0, 8] },
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
        text: socialMedia?.map((s) => s.link_or_number).join(" | ") || "",
        style: "textMuted",
        margin: [0, 2, 0, 4],
      },
      { text: biodata?.address || "", style: ["italic", "textMuted"] },
      {
        text: biodata?.professional_summary || "",
        style: "sectionSpacing",
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
      ul: groupedSkills.map((skill) => ({ text: skill })),
    });
  }

  // Work Experience
  if (jobs?.length) {
    docDefinition.content.push({
      text: "Pengalaman Kerja",
      style: "subheader",
    });

    jobs.forEach((job) => {
      docDefinition.content.push({
        columns: [
          {
            width: "*",
            text: `${job.company_name} - ${job.company_address}`,
            bold: true,
          },
          {
            width: "auto",
            text: `${job.start_date} - ${job.end_date}`,
            style: "textMuted",
          },
        ],
        margin: [0, 6, 0, 2],
      });

      if (job.job_type)
        docDefinition.content.push({
          text: job.job_type,
          style: ["italic", "textMuted"],
        });

      if (job.company_description)
        docDefinition.content.push({
          text: job.company_description,
          style: "sectionSpacing",
        });

      if (job.responsibility) {
        const items = job.responsibility
          .split("\n")
          .filter((t: string) => t.trim());
        if (items.length)
          docDefinition.content.push({
            ul: items.map((i: any) => ({ text: i })),
          });
      }
    });
  }

  // Education
  if (educations?.length) {
    docDefinition.content.push({
      text: "Riwayat Pendidikan",
      style: "subheader",
    });

    educations.forEach((edu) => {
      docDefinition.content.push({
        columns: [
          {
            width: "*",
            text: `${edu.school_name} - ${edu.school_address}`,
            bold: true,
          },
          {
            width: "auto",
            text: `${edu.start_date} - ${edu.end_date}`,
            style: "textMuted",
          },
        ],
        margin: [0, 6, 0, 2],
      });

      if (edu.education_type === "universitas") {
        docDefinition.content.push({
          text: `${edu.major}, IPK ${edu.ipk}`,
          style: ["italic", "textMuted"],
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

    organisations.forEach((org) => {
      docDefinition.content.push({
        columns: [
          {
            width: "*",
            text: `${org.organisation_name} - ${org.address}`,
            bold: true,
          },
          {
            width: "auto",
            text: `${org.start_date} - ${org.end_date}`,
            style: "textMuted",
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
          docDefinition.content.push({
            ul: items.map((i: any) => ({ text: i })),
          });
      }
    });
  }

  // Generate PDF
  pdfMake.createPdf(docDefinition).download("resume.pdf");
};
