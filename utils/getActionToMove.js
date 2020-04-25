export default function (cellProps, attempToMove) { // no function name
  if (!attempToMove) return 'selected';

  const horizontalMovement = Math.abs(cellProps.col - attempToMove.col);
  const verticallMovement = Math.abs(cellProps.row - attempToMove.row);

  const isDobleUnder = horizontalMovement === 2
    && verticallMovement === 2
    && (horizontalMovement - verticallMovement) === 0;

  if (isDobleUnder) return 'doble-under';
  return 'simple-under';
}
