/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {BaseException} from '@angular/core';

import {isBlank} from '../../facade/lang';
import {Url} from '../../url_parser';

import {GeneratedUrl, MatchedUrl, RoutePath} from './route_path';


export interface RegexSerializer { (params: {[key: string]: any}): GeneratedUrl; }

function computeNumberOfRegexGroups(regex: string): number {
  // cleverly compute regex groups by appending an alternative empty matching
  // pattern and match against an empty string, the resulting match still
  // receives all the other groups
  var testRegex = new RegExp(regex + '|');
  return testRegex.exec('').length;
}

export class RegexRoutePath implements RoutePath {
  public hash: string;
  public terminal: boolean = true;
  public specificity: string = '2';

  private _regex: RegExp;

  constructor(
      private _reString: string, private _serializer: RegexSerializer,
      private _groupNames?: Array<string>) {
    this.hash = this._reString;
    this._regex = new RegExp(this._reString);
    if (this._groupNames != null) {
      var groups = computeNumberOfRegexGroups(this._reString);
      if (groups != _groupNames.length) {
        throw new BaseException(
            `Regex group names [${this._groupNames.join(',')}] must contain names for \
each matching group and a name for the complete match as its first element of regex \
'${this._reString}'. ${groups} group names are expected.`);
      }
    }
  }

  matchUrl(url: Url): MatchedUrl {
    var urlPath = url.toString();
    var params: {[key: string]: string} = {};
    var match = urlPath.match(this._regex);

    if (isBlank(match)) {
      return null;
    }

    for (let i = 0; i < match.length; i += 1) {
      params[this._groupNames != null ? this._groupNames[i] : i.toString()] = match[i];
    }

    return new MatchedUrl(urlPath, [], params, [], null);
  }

  generateUrl(params: {[key: string]: any}): GeneratedUrl { return this._serializer(params); }

  toString(): string { return this._reString; }
}
