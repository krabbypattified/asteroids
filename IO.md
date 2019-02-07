## IO

_Device-independent input and output._

<!-- Use HammerJS? -->

Input is a proxy for the DOM event system.

Example: W, A, S, D, Click, LeftClick, RightClick, 1, 2, 3, 4, DOM inputs (which overlap)

```js
{
  click: Keyboard.LeftMouse | Touch.Tap,
  direction: Keyboard.WASD | Touch.Joystick,
}
```

Output is a proxy for `<canvas>`.

Example: across-platform fullscreen WebGL canvas.

```js
{
  context: WebGL,
  fullPage: true,
}
```
