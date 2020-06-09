import * as cdk from '@aws-cdk/core';
import * as fs from 'fs';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam';

export class DarkoEc2UserDataStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // ROLE
    const instanceRole = new iam.Role(this, 'instanceRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com')
    });
    // SSM Permissions
    instanceRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonEC2RoleforSSM'))
    
    // VPC
    const vpc = new ec2.Vpc(this, 'VPC');

    // EC2 instance
    const myInstance = new ec2.Instance(this, 'MyInstance',{
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      machineImage: new ec2.AmazonLinuxImage(),
      keyName: 'x201-eu-west-1',
      role: instanceRole,
      vpc: vpc
    });

    // Add user Data
    var bootscript:string;
    bootscript = fs.readFileSync('assets/userdata.sh','utf8');

    myInstance.addUserData(bootscript);
  }
}
