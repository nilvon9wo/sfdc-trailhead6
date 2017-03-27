public with sharing class DB_GenericDml {
	private static final Boolean IS_ALL_OR_NONE = true; 
	
    public Database.SaveResult[] doInsert(List<SObject> sObjectList) {
    	return Database.insert(sObjectList, IS_ALL_OR_NONE);
    }

    public Database.UpsertResult[] doUpsert(List<SObject> sObjectList) {
    	return Database.upsert(sObjectList, IS_ALL_OR_NONE);
    }

}