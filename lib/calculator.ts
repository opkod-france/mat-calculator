/**
 * Mat calculator for photo framing
 * Calculates optimal dimensions based on different styles
 */

interface Dimensions {
  width: number
  height: number
}

interface MatDimensions {
  top: number
  right: number
  bottom: number
  left: number
}

interface CalculationResult extends MatDimensions {
  frame?: Dimensions
  photo?: Dimensions
  style?: string
  recommendations?: string[]
  error?: string | null
}

interface FrameInput {
  width: string | number
  height: string | number
}

interface PhotoInput {
  width: string | number
  height: string | number
}

export class MatCalculator {
  public styleKeys: string[]

  constructor() {
    this.styleKeys = ['proportional', 'uniform', 'talon', 'panoramic', 'portrait']
  }

  /**
   * Calculate mat dimensions based on the selected style
   * @param frame - Interior frame dimensions {width, height} in mm
   * @param photo - Photo dimensions {width, height} in mm
   * @param style - Calculation style
   * @returns Mat dimensions with validation
   */
  calculate(frame: FrameInput, photo: PhotoInput, style: string): CalculationResult {
    const frameWidth = parseFloat(frame.width.toString()) || 0
    const frameHeight = parseFloat(frame.height.toString()) || 0
    const photoWidth = parseFloat(photo.width.toString()) || 0
    const photoHeight = parseFloat(photo.height.toString()) || 0

    if (frameWidth <= 0 || frameHeight <= 0 || photoWidth <= 0 || photoHeight <= 0) {
      return this.getEmptyResult()
    }

    if (photoWidth >= frameWidth || photoHeight >= frameHeight) {
      return {
        ...this.getEmptyResult(),
        error: 'errorPhotoTooLarge'
      }
    }

    const availableWidth = frameWidth - photoWidth
    const availableHeight = frameHeight - photoHeight

    let result: MatDimensions
    switch (style) {
      case 'proportional':
        result = this.calculateProportional(availableWidth, availableHeight)
        break
      case 'uniform':
        result = this.calculateUniform(availableWidth, availableHeight)
        break
      case 'talon':
        result = this.calculateTalon(availableWidth, availableHeight)
        break
      case 'panoramic':
        result = this.calculatePanoramic(availableWidth, availableHeight)
        break
      case 'portrait':
        result = this.calculatePortrait(availableWidth, availableHeight)
        break
      default:
        result = this.calculateProportional(availableWidth, availableHeight)
    }

    return {
      ...result,
      frame: { width: frameWidth, height: frameHeight },
      photo: { width: photoWidth, height: photoHeight },
      style,
      recommendations: this.getRecommendationKeys(result, style)
    }
  }

  /**
   * Proportional style - equal distribution on all sides
   */
  private calculateProportional(availableWidth: number, availableHeight: number): MatDimensions {
    const margin = Math.min(availableWidth, availableHeight) / 2
    return {
      top: margin,
      right: margin,
      bottom: margin,
      left: margin
    }
  }

  /**
   * Uniform style - equal margins calculated from available space
   */
  private calculateUniform(availableWidth: number, availableHeight: number): MatDimensions {
    const horizontalMargin = availableWidth / 2
    const verticalMargin = availableHeight / 2
    const avgMargin = (horizontalMargin + verticalMargin) / 2

    return {
      top: avgMargin,
      right: avgMargin,
      bottom: avgMargin,
      left: avgMargin
    }
  }

  /**
   * Talon style - larger bottom margin (fine arts rule)
   */
  private calculateTalon(availableWidth: number, availableHeight: number): MatDimensions {
    const horizontalMargin = availableWidth / 2
    const topMargin = availableHeight * 0.4
    const bottomMargin = availableHeight * 0.6

    return {
      top: topMargin,
      right: horizontalMargin,
      bottom: bottomMargin,
      left: horizontalMargin
    }
  }

  /**
   * Panoramic style - reduced horizontal margins
   */
  private calculatePanoramic(availableWidth: number, availableHeight: number): MatDimensions {
    const horizontalMargin = availableWidth * 0.3
    const verticalMargin = availableHeight / 2

    return {
      top: verticalMargin,
      right: horizontalMargin,
      bottom: verticalMargin,
      left: horizontalMargin
    }
  }

  /**
   * Portrait style - reduced vertical margins
   */
  private calculatePortrait(availableWidth: number, availableHeight: number): MatDimensions {
    const horizontalMargin = availableWidth / 2
    const verticalMargin = availableHeight * 0.3

    return {
      top: verticalMargin,
      right: horizontalMargin,
      bottom: verticalMargin,
      left: horizontalMargin
    }
  }

  /**
   * Default empty result
   */
  private getEmptyResult(): CalculationResult {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      error: null
    }
  }

  /**
   * Generate recommendation translation keys based on the result
   */
  private getRecommendationKeys(result: MatDimensions, style: string): string[] {
    const recommendations: string[] = []
    const { top, right, bottom, left } = result
    const avgMargin = (top + right + bottom + left) / 4

    if (avgMargin < 2) {
      recommendations.push('recSmallMargins')
    } else if (avgMargin > 10) {
      recommendations.push('recGenerousMargins')
    }

    if (style === 'talon' && bottom > top) {
      recommendations.push('recTalonApplied')
    }

    if (Math.abs(right - left) < 0.1 && Math.abs(top - bottom) < 0.1) {
      recommendations.push('recBalancedMargins')
    }

    const minMargin = Math.min(top, right, bottom, left)
    if (minMargin >= 3) {
      recommendations.push('recOptimalDimensions')
    }

    return recommendations
  }

  /**
   * Format dimensions for display with custom rounding
   * Rounds to nearest integer: >0.5 rounds up, <0.5 rounds down
   */
  formatDimensions(dimensions: MatDimensions): MatDimensions {
    return {
      top: this.customRound(dimensions.top),
      right: this.customRound(dimensions.right),
      bottom: this.customRound(dimensions.bottom),
      left: this.customRound(dimensions.left)
    }
  }

  /**
   * Custom rounding logic: >0.5 rounds up, <0.5 rounds down, =0.5 rounds up
   */
  private customRound(value: number): number {
    const decimalPart = value - Math.floor(value)

    if (decimalPart > 0.5) {
      return Math.ceil(value)
    } else if (decimalPart < 0.5) {
      return Math.floor(value)
    } else {
      // Exactly 0.5 - round up
      return Math.ceil(value)
    }
  }
}
