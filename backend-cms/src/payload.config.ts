// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { seoPlugin } from "@payloadcms/plugin-seo";
import path from "node:path";
import { ContentSection } from "./blocks/ContentSection";
import { IconCardsGridSection } from "./blocks/IconCardsGridSection";
import { buildConfig } from "payload";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { BlogCategory } from "./collections/BlogCategory";
import { Testimonial } from "./collections/Testimonial";
import { SubArea } from "./collections/SubArea";
import { ImageCardsGridSection } from "./blocks/ImageCardsGridSection";
import { Blog } from "./collections/Blog";
import { Author } from "./collections/Author";
import { ServicesArea } from "./collections/ServicesArea";
import { ContactForm } from "./blocks/ContactForm";
import { FaqSection } from "./blocks/FaqSection";
import { MapWithContentSection } from "./blocks/MapWithContentSection";
import { Service } from "./collections/Service";
import { Homepage } from "./globals/homepage";
import { Aboutpage } from "./globals/aboutpage";
import { Colors } from "./globals/colors";
import { Header } from "./globals/header";
import { Setting } from "./globals/setting";
import { BlogsGridSection } from "./blocks/BlogsGridSection";
import { ServicesGridSection } from "./blocks/ServicesGridSection";
import { uploadthingStorage } from "@payloadcms/storage-uploadthing";
import { TestimonialGridSection } from "./blocks/TestimonialGridSection";
import { ServiceAreaPage } from "./globals/serviceareapage";
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	globals: [Homepage, Aboutpage, Colors, Header, Setting, ServiceAreaPage],
	collections: [
		Users,
		Media,
		Author,
		BlogCategory,
		Testimonial,
		Blog,
		SubArea,
		ServicesArea,
		Service,
	],
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || "",
		},
	}),
	sharp,
	plugins: [
		seoPlugin({
			collections: ["service", "blog", "sa"],
			globals: ["index", "about", "s-area"],
			uploadsCollection: "media",
			fields: ({ defaultFields }) => [
				...defaultFields,
				{
					name: "jsonLD",
					type: "json",
					label: "JSON LD Data",
					required: false,
				},
			],
		}),
		payloadCloudPlugin(),
		uploadthingStorage({
			collections: {
				media: true,
			},
			options: {
				token: process.env.UPLOADTHING_TOKEN,
				acl: "public-read",
			},
		}),
	],
	blocks: [
		ContentSection,
		IconCardsGridSection,
		ImageCardsGridSection,
		ContactForm,
		FaqSection,
		MapWithContentSection,
		BlogsGridSection,
		ServicesGridSection,
		TestimonialGridSection,
	],
});
