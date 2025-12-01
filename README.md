# Sebastian Wanjala Portfolio

A high-class, minimalist, and highly personalized portfolio website showcasing the work of Sebastian Wanjala.

## Features

- **Elegant Loading Screen** - Smooth animated initial with progress indicator
- **Dynamic Hero Section** - Rotating greetings and compelling tagline
- **About Section** - Engaging narrative with animated iconography
- **Projects Showcase** - Interactive project cards with video integration
- **Contact Section** - Easy-to-use contact information
- **Mobile-First Design** - Fully responsive and optimized for all devices
- **Smooth Animations** - Powered by Framer Motion for polished interactions

## Tech Stack

- React 18
- Vite
- Framer Motion
- CSS3 with custom properties

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Add your project videos:
   - Place your MP4 videos in the `public/videos/` folder
   - Name them: `eduvibe.mp4`, `kilymo.mp4`, `project3.mp4`, `project4.mp4`
   - Alternatively, update the video URLs in `src/components/Projects/Projects.jsx`

3. Add project thumbnails (optional):
   - Place thumbnail images in `public/images/`
   - Name them: `eduvibe-thumb.jpg`, `kilymo-thumb.jpg`, etc.

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Video Hosting Recommendations

For better performance and reliability, consider hosting your videos on:
- **Vimeo** - Professional video hosting with embed options
- **YouTube** - Free hosting with privacy settings
- **Cloudflare Stream** - Optimized video delivery
- **AWS S3 + CloudFront** - Self-hosted solution

To use embedded videos, update the `videoUrl` in the projects array to use iframe embeds instead of direct video files.

## Project Structure

```
├── public/
│   ├── videos/          # Project videos (MP4 files)
│   └── images/          # Project thumbnails
├── src/
│   ├── components/
│   │   ├── About/
│   │   ├── Contact/
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── LoadingScreen/
│   │   └── Projects/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
└── package.json
```

## Customization

- Update project details in `src/components/Projects/Projects.jsx`
- Modify colors in `src/index.css` CSS variables
- Adjust animations in component files
- Update contact information in `src/components/Contact/Contact.jsx`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

