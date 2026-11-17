import { useEffect, useRef, useState } from 'react'
import { testimonials } from './data/testimonials'

const CONTACT_EMAIL = 'hello@vickylashenko.com'

function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.classList.add('is-visible')
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -4% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return ref
}

function Reveal({ as: Tag = 'div', className = '', children, ...props }) {
  const ref = useReveal()
  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} {...props}>
      {children}
    </Tag>
  )
}

function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 720) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className="nav">
      <div className="container nav__inner">
        <a className="nav__mark" href="#top" onClick={close}>
          Vicky Lashenko
        </a>
        <button
          className="nav__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
        <ul id="site-nav" className={`nav__links${open ? ' is-open' : ''}`}>
          <li>
            <a href="#about" onClick={close}>
              About
            </a>
          </li>
          <li>
            <a href="#testimonials" onClick={close}>
              Testimonials
            </a>
          </li>
          <li>
            <a className="nav__cta" href="#contact" onClick={close}>
              Get in touch
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="hero__atmosphere" aria-hidden="true" />
      <div className="hero__plane" aria-hidden="true" />
      <div className="container hero__content">
        <h1 className="hero__brand">Vicky Lashenko</h1>
        <p className="hero__headline">
          Researcher, lifelong learner, and consultant for brands and high-achieving individuals.
        </p>
        <p className="hero__lede">
          I help you gain clarity on what truly matters in your personal and professional life, and build
          the strategic plan to get there.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#contact">
            Start a conversation
          </a>
          <a className="btn btn--ghost" href="#about">
            Read the story
          </a>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section" id="about">
      <div className="container about__grid">
        <Reveal className="about__copy">
          <p className="section__eyebrow">About</p>
          <h2 className="section__title">Who I am</h2>
          <p>
            Researcher, lifelong learner, and consultant for brands and high-achieving individuals. I help
            you gain clarity on what truly matters in your personal and professional life, and build the
            strategic plan to get there.
          </p>
          <p>
            This site is a quiet home base: a place to meet the person behind the name, understand the
            work, and begin a conversation when you are ready.
          </p>
        </Reveal>
        <Reveal className="about__aside" as="aside">
          <h2 className="section__title">What guides me</h2>
          <p>
            Curiosity, clear thinking, and a steady focus on outcomes that matter, for people and for
            brands who want a plan they can actually follow.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function Testimonials() {
  const [featured, ...rest] = testimonials

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <Reveal className="testimonials__intro">
          <p className="section__eyebrow">Proof</p>
          <h2 className="section__title">What clients say</h2>
          <p className="section__lede">
            Real words from people I’ve worked with over the years.
          </p>
        </Reveal>

        <div className="testimonials__grid">
          <Reveal as="blockquote" className="testimonial testimonial--featured">
            <p className="testimonial__quote">“{featured.quote}”</p>
            <footer className="testimonial__footer">
              <cite className="testimonial__name">{featured.name}</cite>
              <span className="testimonial__role">{featured.attribution}</span>
            </footer>
          </Reveal>

          {rest.map((item, index) => (
            <Reveal
              as="blockquote"
              className="testimonial"
              key={item.name}
              style={{ transitionDelay: `${(index + 1) * 70}ms` }}
            >
              <p className="testimonial__quote">“{item.quote}”</p>
              <footer className="testimonial__footer">
                <cite className="testimonial__name">{item.name}</cite>
                <span className="testimonial__role">{item.attribution}</span>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') || '').trim()
    const email = String(form.get('email') || '').trim()
    const message = String(form.get('message') || '').trim()
    const subject = encodeURIComponent(`Message from ${name || 'vickylashenko.com'}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <section className="contact" id="contact">
      <div className="contact__bg" aria-hidden="true" />
      <div className="container contact__inner">
        <Reveal>
          <p className="section__eyebrow">Contact</p>
          <h2 className="section__title">Let’s talk about what matters</h2>
          <p className="section__lede">
            Share a little about where you want clarity, personally or professionally. Swap the email
            below when you are ready for the real inbox.
          </p>
        </Reveal>
        <Reveal>
          <form className="contact__form" onSubmit={handleSubmit}>
            <label>
              Name
              <input name="name" type="text" autoComplete="name" placeholder="Your name" required />
            </label>
            <label>
              Email
              <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
            </label>
            <label>
              Message
              <textarea name="message" placeholder="What are you working on?" required />
            </label>
            <button className="btn btn--primary" type="submit">
              Send message
            </button>
            <p className="contact__mailto">
              Or email directly:{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__brand">Vicky Lashenko</span>
        <span>vickylashenko.com · © {year}</span>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="site">
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
