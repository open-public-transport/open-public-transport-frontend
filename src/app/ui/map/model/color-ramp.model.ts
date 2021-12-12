/**
 * Represents a color ramp
 */
export class ColorRamp {

  /** Color ramp used on luftdaten.info */
  static LUFTDATEN_COLOR_RAMP = [
    'rgba(150, 0, 132, 0.6)',
    'rgba(236, 107, 11, 0.6)',
    'rgba(246, 155, 31, 0.6)',
    'rgba(249, 168, 37, 0.6)',
    'rgba(199, 159, 51, 0.6)',
    'rgba(137, 147, 69, 0.6)',
    'rgba(125, 145, 72, 0.6)',
    'rgba(12, 123, 104, 0.6)'
  ];

  /** Color ramp used on luftdaten.info */
  static LUFTDATEN_COLOR_RAMP_30 = [
    'rgba(150, 0, 132, 0.3)',
    'rgba(236, 107, 11, 0.3)',
    'rgba(246, 155, 31, 0.3)',
    'rgba(249, 168, 37, 0.3)',
    'rgba(199, 159, 51, 0.3)',
    'rgba(137, 147, 69, 0.3)',
    'rgba(125, 145, 72, 0.3)',
    'rgba(12, 123, 104, 0.3)'
  ];

  /** Color ramp used on luftdaten.info */
  static LUFTDATEN_COLOR_RAMP_INVERTED = [
    'rgba(12, 123, 104, 0.6)',
    'rgba(125, 145, 72, 0.6)',
    'rgba(137, 147, 69, 0.6)',
    'rgba(199, 159, 51, 0.6)',
    'rgba(249, 168, 37, 0.6)',
    'rgba(246, 155, 31, 0.6)',
    'rgba(236, 107, 11, 0.6)',
    'rgba(150, 0, 132, 0.6)',
  ];

  /** Color ramp used on luftdaten.info */
  static LUFTDATEN_COLOR_RAMP_LIGHT = [
    'transparent',
    'rgba(236, 107, 11, 0.05)',
    'rgba(246, 155, 31, 0.1)',
    'rgba(249, 168, 37, 0.1)',
    'rgba(199, 159, 51, 0.2)',
    'rgba(137, 147, 69, 0.2)',
    'rgba(125, 145, 72, 0.3)',
    'rgba(12, 123, 104, 0.3)'
  ];

  /** Color ramp used on luftdaten.info */
  static LUFTDATEN_COLOR_RAMP_LIGHT_INVERTED = [
    'rgba(12, 123, 104, 0.3)',
    'rgba(125, 145, 72, 0.3)',
    'rgba(137, 147, 69, 0.2)',
    'rgba(199, 159, 51, 0.2)',
    'rgba(249, 168, 37, 0.1)',
    'rgba(246, 155, 31, 0.1)',
    'rgba(236, 107, 11, 0.05)',
    'transparent',
  ];

  /** Color ramp used on luftdaten.info */
  static LUFTDATEN_COLOR_RAMP_ALARM = [
    'rgba(150, 0, 132, 0.75)',
    'rgba(236, 107, 11, 0.6)',
    'rgba(246, 155, 31, 0.45)',
    'rgba(249, 168, 37, 0.1)',
    'rgba(199, 159, 51, 0.1)',
    'rgba(137, 147, 69, 0.1)',
    'rgba(125, 145, 72, 0.05)',
    'rgba(12, 123, 104, 0.0025)'
  ];
}
