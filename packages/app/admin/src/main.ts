import CMS from 'decap-cms-app';
import { GitHubBackend } from 'decap-cms-backend';

CMS.registerBackend('custom', GitHubBackend);

CMS.init({
  config: {
    backend: {
      name: 'custom' as any,
      repo: "Lenne231/cocoon",
      branch: "main"
    },
    load_config_file: false,
    media_folder: "static/images/uploads",
    public_folder: "/images/uploads",
    collections: [
      { label: "Blog", name: "blog", folder: "_posts/blog", create: true, fields: [
        { label: "Title", name: "title", widget: "string" },
        { label: "Publish Date", name: "date", widget: "datetime" },
        { label: "Featured Image", name: "thumbnail", widget: "image" },
        { label: "Body", name: "body", widget: "markdown" },
      ]},
    ],
  },
});