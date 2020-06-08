import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as DarkoEc2UserData from '../lib/darko_ec2_user_data-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new DarkoEc2UserData.DarkoEc2UserDataStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
