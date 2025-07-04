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

export const generatePdfTextBased2 = (data: {
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
    pageMargins: [20, 20, 20, 20],
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
    background: function (currentPage: any, pageSize: any) {
      return {
        canvas: [
          {
            type: "rect",
            x: 0,
            y: 0,
            w: 200,
            h: pageSize.height,
            color: "#F3F4F6",
          },
        ],
      };
    },
  };
  docDefinition.content.push(
    // Then main content over it
    {
      stack: [
        {
          columns: [
            {
              width: "30%",
              stack: [
                // Left content (photo, address, etc)
                biodata?.photo
                  ? {
                      image: biodata.photo,
                      width: 80,
                      alignment: "left",
                      margin: [0, 0, 0, 10],
                    }
                  : { text: "", margin: [0, 0, 0, 10] },

                {
                  text: "Alamat",
                  alignment: "left",
                  margin: [0, 4, 0, 0],
                  bold: true,
                },
                {
                  text: biodata?.address || "",
                  style: ["italic", "medium"],
                  alignment: "left",
                  margin: [0, 0, 0, 8],
                },

                ...socialMedia.map((s) => ({
                  text: s.link_or_number,
                  style: "medium",
                  margin: [0, 2, 0, 2],
                  alignment: "left",
                })),

                ...(groupedSkills?.length
                  ? [
                      {
                        text: "Keterampilan",
                        style: "subheader",
                        margin: [0, 12, 0, 4],
                      },
                      {
                        canvas: [
                          {
                            type: "line",
                            x1: 0,
                            y1: 0,
                            x2: 130,
                            y2: 0,
                            lineWidth: 0.7,
                            lineColor: "#000000",
                          },
                        ],
                        margin: [0, 0, 0, 10],
                      },
                      {
                        ul: groupedSkills.map((skill) => {
                          const [boldPart, ...restParts] = skill.split(":");
                          const rest = restParts.join(":").trim();
                          return {
                            text: [
                              {
                                text: boldPart + (rest ? ": " : ""),
                                bold: true,
                              },
                              { text: rest },
                            ],
                            margin: [0, 2, 0, 2],
                          };
                        }),
                        style: "medium",
                      },
                    ]
                  : []),
              ],
              margin: [8, 8, 8, 8],
            },
            //right side
            {
              width: "*",
              stack: [
                {
                  text: biodata?.name || "",
                  style: "header",
                  alignment: "left",
                },
                biodata?.professional_summary
                  ? {
                      text: biodata.professional_summary,
                      style: ["medium"],
                      margin: [0, 0, 0, 12],
                    }
                  : {},

                // Jobs
                ...(jobs?.length
                  ? [
                      {
                        text: "Pengalaman Kerja",
                        style: "subheader",
                      },
                      {
                        canvas: [
                          {
                            type: "line",
                            x1: 0,
                            y1: 0,
                            x2: 350,
                            y2: 0,
                            lineWidth: 0.7,
                            lineColor: "#000000",
                          },
                        ],
                        margin: [0, 0, 0, 10],
                      },
                      ...jobs.map((job) => {
                        const [namePart, ...addressParts] =
                          `${job.company_name} - ${job.company_address}`.split(
                            "-"
                          );
                        const address = addressParts.join("-").trim();

                        const leftColumnStack = [
                          {
                            text: namePart.trim(),
                            bold: true,
                            margin: [0, 0, 0, 2],
                          },
                          {
                            text: `${DateFormater(job.start_date)} - ${DateFormater(job.end_date)}`,
                            style: "textMuted",
                            margin: [0, 0, 0, 2],
                          },
                          ...(address
                            ? [
                                {
                                  text: address,
                                  style: "textMuted",
                                  margin: [0, 0, 0, 2],
                                },
                              ]
                            : []),
                        ];

                        const rightColumnStack = [
                          ...(job.job_type
                            ? [
                                {
                                  text: job.job_type,
                                  style: ["italic", "textMuted"],
                                  margin: [0, 0, 0, 2],
                                },
                              ]
                            : []),
                          ...(job.responsibility
                            ? job.responsibility
                                .split("\n")
                                .filter((t: string) => t.trim())
                                .map((i: string) => ({
                                  columns: [
                                    // { width: 10, text: " " }, // optional left padding
                                    {
                                      width: "*",
                                      columns: [
                                        {
                                          width: 5,
                                          text: "•",
                                          alignment: "left",
                                        }, // manual bullet
                                        {
                                          width: "*",
                                          text: i.replace(/^[-•]\s*/, ""),
                                          style: "medium",
                                        }, // clean if already has bullet
                                      ],
                                      columnGap: 5,
                                    },
                                  ],
                                  margin: [0, 0, 0, 0],
                                }))
                            : []),
                        ];

                        return {
                          columns: [
                            { width: "42%", stack: leftColumnStack },
                            { width: "*", stack: rightColumnStack },
                          ],
                          columnGap: 10,
                          margin: [0, 6, 0, 12],
                        };
                      }),
                    ]
                  : []),

                // Educations
                ...(educations?.length
                  ? [
                      {
                        text: "Riwayat Pendidikan",
                        style: "subheader",
                        margin: [0, 12, 0, 0],
                      },
                      {
                        canvas: [
                          {
                            type: "line",
                            x1: 0,
                            y1: 0,
                            x2: 350,
                            y2: 0,
                            lineWidth: 0.7,
                            lineColor: "#000000",
                          },
                        ],
                        margin: [0, 0, 0, 10],
                      },
                      ...educations.map((edu) => {
                        const [namePart, ...addressParts] =
                          `${edu.school_name} - ${edu.school_address}`.split(
                            "-"
                          );
                        const address = addressParts.join("-").trim();

                        return {
                          stack: [
                            {
                              columns: [
                                {
                                  width: "70%",
                                  text: [
                                    { text: namePart.trim(), bold: true },
                                    ...(address
                                      ? [
                                          {
                                            text: " - " + address,
                                            style: "textMuted",
                                          },
                                        ]
                                      : []),
                                  ],
                                },
                                {
                                  text: `${DateFormater(edu.start_date)} - ${DateFormater(edu.end_date)}`,
                                  style: "textMuted",
                                  alignment: "right",
                                },
                              ],
                              columnGap: 10,
                              style: "medium",
                              margin: [0, 6, 0, 2],
                            },
                            ...(edu.education_type === "universitas"
                              ? [
                                  {
                                    text: `${edu.major}, IPK ${edu.ipk}`,
                                    style: ["italic", "medium"],
                                  },
                                ]
                              : []),
                          ],
                        };
                      }),
                    ]
                  : []),

                // Organisations
                ...(organisations?.length
                  ? [
                      {
                        text: "Pengalaman Berorganisasi",
                        style: "subheader",
                        margin: [0, 12, 0, 0],
                      },
                      {
                        canvas: [
                          {
                            type: "line",
                            x1: 0,
                            y1: 0,
                            x2: 350,
                            y2: 0,
                            lineWidth: 0.7,
                            lineColor: "#000000",
                          },
                        ],
                        margin: [0, 0, 0, 10],
                      },
                      ...organisations.map((org) => {
                        const [namePart, ...addressParts] =
                          `${org.organisation_name} - ${org.address}`.split(
                            "-"
                          );
                        const address = addressParts.join("-").trim();

                        return {
                          stack: [
                            {
                              columns: [
                                {
                                  width: "70%",
                                  text: [
                                    { text: namePart.trim(), bold: true },
                                    ...(address
                                      ? [
                                          {
                                            text: " - " + address,
                                            style: "textMuted",
                                          },
                                        ]
                                      : []),
                                  ],
                                  style: "medium",
                                },
                                {
                                  text: `${DateFormater(org.start_date)} - ${DateFormater(org.end_date)}`,
                                  style: "textMuted",
                                  alignment: "right",
                                },
                              ],
                              margin: [0, 6, 0, 2],
                            },
                            ...(org.division
                              ? [
                                  {
                                    text: org.division,
                                    style: ["italic", "textMuted"],
                                  },
                                ]
                              : []),
                            ...(org.responsibility
                              ? org.responsibility
                                  .split("\n")
                                  .filter((t: string) => t.trim())
                                  .map((i: any) => ({
                                    text: i,
                                    style: "medium",
                                    margin: [12, 0, 0, 0],
                                  }))
                              : []),
                            ...(org.responsibility
                              ? org.responsibility
                                  .split("\n")
                                  .filter((t: string) => t.trim())
                                  .map((i: any) => ({
                                    text: i,
                                    style: "medium",
                                    margin: [12, 0, 0, 0],
                                  }))
                              : []),
                            ...(org.responsibility
                              ? org.responsibility
                                  .split("\n")
                                  .filter((t: string) => t.trim())
                                  .map((i: any) => ({
                                    text: i,
                                    style: "medium",
                                    margin: [12, 0, 0, 0],
                                  }))
                              : []),
                            ...(org.responsibility
                              ? org.responsibility
                                  .split("\n")
                                  .filter((t: string) => t.trim())
                                  .map((i: any) => ({
                                    text: i,
                                    style: "medium",
                                    margin: [12, 0, 0, 0],
                                  }))
                              : []),
                          ],
                        };
                      }),
                    ]
                  : []),
              ],
              margin: [10, 10, 10, 10],
            },
          ],
          columnGap: 12,
        },
      ],
      margin: [10, 20, 10, 20], // Apply top margin to all pages
    }
  );

  // Generate PDF
  pdfMake.createPdf(docDefinition).download("resume.pdf");
};
