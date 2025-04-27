export default function Shop({ children}) {
  return (
    <section id="shop">
      <h2>Food for every taste</h2>
      <ul id="products">
        {children}
      </ul>
    </section>
  );
}
