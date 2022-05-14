# Baro-admin-website

Current Website:
- Currently, the website allows you to sign in with a baro account and review vehicles upload. 
- home page is a table with name, license plate, ownerID, picture of car and the status of vehicle (approved, pending, declined) with an accept or decline button.
- decline button contains a pop up that admin must describe why we are declining 


Bugs 
- image property of vehicle only loads when we dont resize it, if we try to resize it we get a 403 error or 401



Things we need done: (All data withing data structures need to be shown within tables created)
- Website tabs to add: Items Reported, Damage Item Report, Item Exchange Reported, Driver License Uploaded 

- Tab name : Items Reported
- Add another page of the website with items reported info. Pull data from example data structures below and Create a table where admin can see info of reported item and who reported it.
  - Allow deletion of item if item is inappropriate, then send user of inapporpraite content a push notification and in app notification that there item was deleted because of inappropriate content.
![alt text](https://user-images.githubusercontent.com/11301401/31523784-9db5ec44-af83-11e7-9ce0-6857819ba613.png)
  - How to delete item:
![alt text](https://user-images.githubusercontent.com/11301401/31524170-ea8e42a8-af85-11e7-90d4-b25b7ee4d79c.png)
  - In App notification data structure:
![alt text](https://user-images.githubusercontent.com/11301401/31524888-7fd73442-af8a-11e7-8c43-b74c47c18fd9.png)
  
- Tab name: Damage Item Reported  
- Add another page of the website with "status reported" info.Pull data from example data structures below and Create a table where the admin would see submitted damage of item/proprty claim.
![alt text](https://user-images.githubusercontent.com/11301401/31524830-1daf0ede-af8a-11e7-9027-72c0c56f49fb.png)
  - Also chargeID needs to be added to table,  use status ID to look up charge ID:
![alt text](https://user-images.githubusercontent.com/11301401/31524514-19d8f24a-af88-11e7-883d-18023691743c.png)

- Tab name: Item Exchange Reported
- Add another page of the website for "ItemExcahngeReported". Pull data from example data structures below and Create a table where the admin would see a submitted item exchange report from either the renter or owner. (Example report: Renter never showed up to pick up item)
  - ChargeID also needs to be added to this table
![alt text](https://user-images.githubusercontent.com/11301401/31525058-a1cbc77e-af8b-11e7-9116-74c351185ea2.png)


-Tab name: Driver Licenses Uploaded
- Add another page of website for "UsersDriverLicense". Pull data from example data structures below and Create a table where the admin would see userID with submitted driverlicense number.
  - Allow ability to change "verified" in "UsersDriverLicense" to true or "declined", while also updating users data to change "driverLicenseVerified" to true or "declined"
  - Top child node of "Users" and "UsersDriverLicense"  is the userID
![alt text](https://user-images.githubusercontent.com/11301401/31579741-a00acab8-b10a-11e7-8ab0-e1674aa59365.png)


