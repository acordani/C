```
rails g model Skill listing_skill:string  active:boolean user:references
```

```
rake db:migrate
```

Ca donne

```
Running via Spring preloader in process 20447
== 20170508131308 CreateSkills: migrating =====================================
-- create_table(:skills)
   -> 0.0613s
== 20170508131308 CreateSkills: migrated (0.0615s) ============================
```

Puis dans ```app/models/skill.rb```
```
class class Skill < ApplicationRecord 

	belongs_to :user

	validates :listing_skill, presence: true
	
end
```

Puis Rajout des compétences:

```
LISTING_SKILL = ["Negociateur", "Photographe", "Home Stager", "Graphiste", "Distributeur"]
validates :listing_skill, presence: true, , inclusion: { in: LISTING_SKILL }
```
