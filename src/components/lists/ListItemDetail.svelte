<script>
  export let name;
  export let value;
  export let dataType;

  // I don't love this textColor way of doing things but works for now.
</script>

<div>
  <span>{name}</span>
  <span data-type={dataType}>{value}</span>
</div>

<style>
  div {
    flex: 1 1 auto;
  }
  span {
    display: block;
    margin: 1em 1em 0 1em;
  }
  span:first-of-type {
    color: var(--text-color);
    opacity: 0.8;
    display: block;
    text-transform: uppercase;
    font-size: 0.6em;
  }
  span:last-of-type {
    font-size: 1.4em;
    margin: 0 1em 1em 1em;
  }
  [data-type="default"]{
    color: var(--item-detail-color);
  }
  [data-type="neutral"]{
    color: var(--text-color);
  }
  [data-type="positive"]{
    color: var(--positive);
  }
  [data-type="negative"]{
    color: var(--negative);
  }
  @media only screen and (max-width: 568px) {
    div {
      flex: 1 1 50%;
    }
  }
</style>
