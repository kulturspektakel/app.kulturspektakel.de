export default function NonMale(props: {
  numberOfArtists: number;
  numberOfNonMaleArtists: number;
}) {
  return (
    <>
      {props.numberOfArtists} Personen (
      {(
        (props.numberOfArtists! - props.numberOfNonMaleArtists!) /
        props.numberOfArtists!
      ).toLocaleString(undefined, {
        style: 'percent',
        maximumFractionDigits: 1,
      })}
      &nbsp;männlich)
    </>
  );
}
