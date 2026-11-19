import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '../App.jsx';
import { books } from '../scene/assets/books.js';
import { objectRecipes } from '../scene/assets/objectRecipes.js';
import { findArtworkAsset, findObjectAsset, objectManifest } from '../scene/assets/objectAssets.js';

describe('reusable transparent room assets',()=>{
  it('resolves every authored room piece to a registered standalone asset',()=>{
    for(const recipe of objectRecipes()){const asset=findObjectAsset(recipe.id);expect(asset,recipe.id).toBeTruthy();if(asset.key)expect(findArtworkAsset(recipe.source,recipe.path,recipe.edgePadding??3.5)?.id,recipe.id).toBe(recipe.id);}
  });
  it('keeps every book separate with stable identity and extensible content slots',()=>{
    render(<App />);
    expect(books).toHaveLength(20);
    expect(new Set(books.map(book=>book.id)).size).toBe(20);
    for(const book of books){
      expect(document.querySelectorAll(`[data-part="${book.id}"]`)).toHaveLength(1);
      expect(Object.keys(book.content).sort()).toEqual(['author','entry','title']);
    }
    expect(books.filter(book=>book.owner==='wall-shelf')).toHaveLength(4);
    expect(books.filter(book=>book.owner==='bookcase')).toHaveLength(13);
    expect(books.filter(book=>book.owner==='desk-books')).toHaveLength(3);
  });
  it('renders transparent object files over one bare room instead of full-room raster clips',()=>{
    render(<App />);
    expect(document.querySelector('.room-art').getAttribute('src')).toBe(objectManifest.background.file);
    const images=[...document.querySelectorAll('.room svg image')];
    expect(images.length).toBeGreaterThan(50);
    expect(images.every(image=>/^assets\/rebuilt\/v1\/(ready|(?:seating-study|style-study)\/ready)\//.test(image.getAttribute('href')))).toBe(true);
    expect(document.querySelectorAll('.scene-artwork clipPath')).toHaveLength(0);
    expect(document.querySelector('[data-asset-id="bookcase-plant"]')).toBeNull();
    expect(document.querySelector('[data-asset-id="desk-plant"]')).toBeNull();
    expect([...document.querySelectorAll('.desk-books-module [data-part]')].map(el=>el.dataset.part)).toEqual(['desk-book-03','desk-book-02','desk-book-01']);
  });
});
