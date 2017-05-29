import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

/**
 * Generated class for the SafeHtmlPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'safeUrl',
})
export class SafeUrlPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  constructor(
    private sanitizer: DomSanitizer,
  ){}

  transform(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
