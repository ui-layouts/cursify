import fs from 'fs';
import path from 'path';
import { visit } from 'unist-util-visit';
import { toString } from 'hast-util-to-string';
import remarkGfm from 'remark-gfm';
import createMDX from '@next/mdx';
import { remarkCodeHike, recmaCodeHike } from 'codehike/mdx';
import rehypeSlug from 'rehype-slug';

const chConfig = {
  components: { code: 'PreCode' },
};

function labelTableColumns() {
  return (tree) => {
    visit(tree, 'element', table => {
      if (table.tagName !== 'table') return;
      const heading = table.children.find(node => node.tagName === 'thead');
      const row = heading?.children.find(node => node.tagName === 'tr');
      const labels = row?.children.filter(node => node.tagName === 'th').map(node => toString(node));
      if (!labels) return;
      visit(table, 'element', row => {
        if (row.tagName !== 'tr') return;
        row.children.filter(node => node.tagName === 'td').forEach((cell, index) => {
          cell.properties.dataColumn = labels[index] ?? '';
        });
      });
    });
  };
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, [remarkCodeHike, chConfig]],
    recmaPlugins: [[recmaCodeHike, chConfig]],
    rehypePlugins: [rehypeSlug, labelTableColumns],
    jsx: true,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
      },
      {
        hostname: 'res.cloudinary.com',
      },
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'img.freepik.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/components/smooth-follower',
        destination: '/components/smooth-cursor-follower',
        permanent: true,
      },
    ];
  },
};

export default withMDX(nextConfig);
