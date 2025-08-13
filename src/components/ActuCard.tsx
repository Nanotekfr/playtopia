---
const { title, link, pubDate, description } = Astro.props;

const date = pubDate
  ? new Date(pubDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  : 'Date inconnue';

const cleanDescription = description
  ?.replace(/<[^>]+>/g, '') // Retire les balises HTML
  ?.slice(0, 200) + '...';
---

<article class="actu-card">
  <a href={link} target="_blank" rel="noopener noreferrer" class="title">{title}</a>
  <p class="date">🗓️ {date}</p>
  {cleanDescription && <p class="desc">{cleanDescription}</p>}
  <a class="btn" href={link} target="_blank" rel="noopener noreferrer">📖 Lire l’article complet</a>
</article>

<style>
  .actu-card {
    background: #2c1f54;
    border-left: 5px solid #ffae42;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(90, 50, 110, 0.5);
    transition: transform 0.2s ease;
  }

  .actu-card:hover {
    transform: scale(1.01);
  }

  .title {
    font-size: 1.25rem;
    font-weight: bold;
    color: #ffae42;
    text-decoration: none;
  }

  .title:hover {
    text-decoration: underline;
    color: #fff;
  }

  .date {
    font-size: 0.9rem;
    color: #c0a060;
    margin: 0.5rem 0;
  }

  .desc {
    font-size: 1rem;
    color: #d8c6ff;
    line-height: 1.4;
    margin-bottom: 1rem;
  }

  .btn {
    background-color: #ffae42;
    color: #1a0f30;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    font-weight: bold;
    text-decoration: none;
    display: inline-block;
    transition: background-color 0.2s ease;
  }

  .btn:hover {
    background-color: #ffd38b;
  }
</style>