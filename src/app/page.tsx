import { Hero } from "@/components/home/Hero";
import { ProductCard } from "@/components/products/ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Star } from "lucide-react";

// Mock data for featured products
const featuredProducts = [
  {
    id: "1",
    name: "Custom Oil Portrait",
    description: "Hand-painted oil portrait based on your photo.",
    price: 149.99,
    category: "portraits",
    images: JSON.stringify(["https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000&auto=format&fit=crop"]),
    stock: 10,
  },
  {
    id: "2",
    name: "Handmade Clay Vase",
    description: "Unique aesthetic vase for your home.",
    price: 45.00,
    category: "crafts",
    images: JSON.stringify(["https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2000&auto=format&fit=crop"]),
    stock: 5,
  },
  {
    id: "3",
    name: "Personalized Memory Box",
    description: "Wooden box engraved with your message.",
    price: 89.00,
    category: "gifts",
    images: JSON.stringify(["https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=2000&auto=format&fit=crop"]),
    stock: 8,
  },
  {
    id: "4",
    name: "Minimalist Sketch",
    description: "Charcoal sketch of your favorite memory.",
    price: 75.00,
    category: "portraits",
    images: JSON.stringify(["https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2000&auto=format&fit=crop"]),
    stock: 15,
  },
];

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Categories Section */}
      <section style={{ padding: '6rem 1.5rem', backgroundColor: 'var(--color-cream)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.5rem',
            textAlign: 'center',
            marginBottom: '3rem',
            color: 'var(--color-earth)'
          }}>Shop by Category</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {['Portraits', 'Crafts', 'Gifts'].map((category) => (
              <Link href={`/category/${category.toLowerCase()}`} key={category} style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-md)', height: '400px' }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'var(--color-stone)',
                  opacity: 0.1
                }}></div>
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column', gap: '1rem',
                  backgroundColor: 'rgba(93, 64, 55, 0.05)',
                  transition: 'background-color 0.3s'
                }}
                  className="category-card"
                >
                  <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)' }}>{category}</h3>
                  <Button variant="outline">Browse {category}</Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '6rem 1.5rem', backgroundColor: 'var(--color-sand)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem' }}>
            <div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.5rem',
                marginBottom: '1rem',
                color: 'var(--color-earth)'
              }}>Featured Creations</h2>
              <p style={{ maxWidth: '500px', opacity: 0.8 }}>Handpicked pieces that embody emotion and craftsmanship.</p>
            </div>
            <Link href="/shop">
              <Button variant="ghost">View All <ArrowRight size={16} /></Button>
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Behind the Art / About */}
      <section style={{ padding: '6rem 1.5rem', backgroundColor: 'var(--color-earth)', color: 'var(--color-cream)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '2rem' }}>Behind the Art</h2>
          <p style={{ fontSize: '1.25rem', lineHeight: '1.8', marginBottom: '3rem', opacity: 0.9 }}>
            Founding SoulSketch Studio was never just about selling art. It was about capturing the fleeting moments that define us.
            Every stroke of the brush, every molded clay piece, tells a story of love, memory, and human connection.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem' }}>
            <div>
              <strong style={{ display: 'block', fontSize: '2.5rem', fontFamily: 'var(--font-heading)' }}>500+</strong>
              <span>Stories Told</span>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '2.5rem', fontFamily: 'var(--font-heading)' }}>100%</strong>
              <span>Handmade</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section style={{ padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', marginBottom: '4rem' }}>Loved by Soulful People</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ padding: '2rem', backgroundColor: 'white', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)' }}>
                <div style={{ display: 'flex', color: '#FFB400', marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#FFB400" />)}
                </div>
                <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  "The portrait brought tears to my eyes. It wasn't just a painting; it captured the very essence of my grandmother."
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-stone)' }}></div>
                  <span style={{ fontWeight: 700 }}>Sarah J.</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
