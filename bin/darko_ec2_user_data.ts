#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { DarkoEc2UserDataStack } from '../lib/darko_ec2_user_data-stack';

const app = new cdk.App();
new DarkoEc2UserDataStack(app, 'DarkoEc2UserDataStack');
