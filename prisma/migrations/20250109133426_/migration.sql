-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cv" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Cv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialMedia" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "link_or_number" TEXT NOT NULL,
    "personal_data_id" INTEGER NOT NULL,

    CONSTRAINT "SocialMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalData" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "link" TEXT NOT NULL,
    "portfolio" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "social_media_id" INTEGER NOT NULL,
    "professional_summary" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cv_id" INTEGER NOT NULL,

    CONSTRAINT "PersonalData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organisation" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "organisation_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "responsibility" TEXT NOT NULL,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "cv_id" INTEGER NOT NULL,

    CONSTRAINT "Organisation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkExperience" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_address" TEXT NOT NULL,
    "responsibility" TEXT NOT NULL,
    "company_description" TEXT NOT NULL,
    "job_type" TEXT NOT NULL,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "cv_id" INTEGER NOT NULL,

    CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "school_name" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "ipk" TEXT NOT NULL,
    "education_type" TEXT NOT NULL,
    "school_address" TEXT NOT NULL,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "cv_id" INTEGER NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Other" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "cv_id" INTEGER NOT NULL,

    CONSTRAINT "Other_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cv_user_id_key" ON "Cv"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "SocialMedia_personal_data_id_key" ON "SocialMedia"("personal_data_id");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalData_cv_id_key" ON "PersonalData"("cv_id");

-- AddForeignKey
ALTER TABLE "Cv" ADD CONSTRAINT "Cv_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialMedia" ADD CONSTRAINT "SocialMedia_personal_data_id_fkey" FOREIGN KEY ("personal_data_id") REFERENCES "PersonalData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalData" ADD CONSTRAINT "PersonalData_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "Cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organisation" ADD CONSTRAINT "Organisation_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "Cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "Cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "Cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Other" ADD CONSTRAINT "Other_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "Cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
